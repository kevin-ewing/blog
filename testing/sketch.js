const EYE_MOMENTUM = 0.2 // how fast the pupil follows the target

let pX, pY // pupil position (with momentum)
let blinkProg = 0 // 0 = no blink, 0‒1 = blink cycle
let lastBlink = 0,
    nextDelay

// mouse / idle jitter
let lastMouseX = 0,
    lastMouseY = 0,
    lastMoveTime = 0
let jitterOffset = { x: 0, y: 0 },
    nextJitterTime = 0
let idleTarget = null,
    nextIdleTargetTime = 0

let irisColor = 0;

function setup() {
    createCanvas(windowWidth, windowHeight)
    pX = width / 2
    pY = height / 2
    nextDelay = random(2000, 6000)
    irisColor = color(random(40, 255), random(40, 255), random(40, 255));
    strokeCap(ROUND)
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight)
    pX = width / 2
    pY = height / 2
    
}

function draw() {
    background(255)

    const openness = calculateOpenness()
    pupil()
    eyelids(openness)
}

function calculateOpenness(blinkSpeed = 0.08) {
    let openness = 1
    if (blinkProg > 0) {
        // mid-blink
        blinkProg += blinkSpeed
        openness =
            blinkProg < 0.5
                ? map(blinkProg, 0, 0.5, 1, 0) // closing
                : map(blinkProg, 0.5, 1, 0, 1) // opening
        if (blinkProg >= 1) blinkProg = 0
    } else if (millis() - lastBlink > nextDelay) {
        // start new blink
        blinkProg = 0.01
        lastBlink = millis()
        nextDelay = random(2000, 6000)
    }
    return openness
}

function pupilTarget() {
    const cx = width / 2,
        cy = height / 2
    const rx = 80,
        ry = 65,
        sensitivity = 0.7
    const now = millis()

    // detect user motion
    const movedDist = dist(mouseX, mouseY, lastMouseX, lastMouseY)
    if (movedDist > 3) {
        lastMouseX = mouseX
        lastMouseY = mouseY
        lastMoveTime = now
        idleTarget = null
    }

    // idle roaming
    if (now - lastMoveTime > 3000) {
        if (!idleTarget || now > nextIdleTargetTime) {
            const angle = random(TWO_PI)
            const r = pow(random(), 2) * 0.8 // bias toward centre
            idleTarget = {
                x: cx + cos(angle) * rx * r,
                y: cy + sin(angle) * ry * r,
            }
            nextIdleTargetTime = now + random(800, 1800)
        }
    }

    // choose target
    let dx, dy
    if (idleTarget) {
        dx = idleTarget.x - cx
        dy = idleTarget.y - cy
    } else {
        // base offset from mouse
        let nx = ((mouseX - cx) / (width / 2)) * sensitivity
        let ny = ((mouseY - cy) / (height / 2)) * sensitivity
        dx = nx * rx
        dy = ny * ry

        // occasional jitter while following mouse
        if (now > nextJitterTime) {
            const angle = random(TWO_PI)
            const r = pow(random(), 2) * 0.2
            jitterOffset.x = cos(angle) * rx * r
            jitterOffset.y = sin(angle) * ry * r
            nextJitterTime = now + random(1000, 3000)
        }
        dx += jitterOffset.x
        dy += jitterOffset.y

        // ensure inside ellipse
        const t2 = (dx * dx) / (rx * rx) + (dy * dy) / (ry * ry)
        if (t2 > 1) {
            const k = 1 / Math.sqrt(t2)
            dx *= k
            dy *= k
        }
    }

    return { x: cx + dx, y: cy + dy }
}

function pupil() {
    const { x: targetX, y: targetY } = pupilTarget();
    pX += (targetX - pX) * EYE_MOMENTUM;
    pY += (targetY - pY) * EYE_MOMENTUM;

    noStroke();

    // iris
    fill(irisColor);
    circle(pX, pY, 80);

    // dark pupil
    fill(0);
    circle(pX, pY, 45);
}


function eyelids(openness = 1) {
    const cx = width / 2,
        cy = height / 2

    const upPadX = 15,
        upPadY = 30
    const upStartX = cx - 100,
        upEndX = cx + 100
    const upArcH = openness * 125
    const upMaskStartX = upStartX - upPadX,
        upMaskEndX = upEndX + upPadX
    const upMaskArcH = upArcH + upPadY

    const lowPadX = 15,
        lowPadY = 25
    const lowStartX = cx - 100,
        lowEndX = cx + 100
    const lowArcH = openness * -105
    const lowMaskStartX = lowStartX - lowPadX,
        lowMaskEndX = lowEndX + lowPadX
    const lowMaskArcH = lowArcH - lowPadY

    push()
    strokeCap(SQUARE)

    // upper lid
    noFill()
    stroke(0)
    strokeWeight(30)
    beginShape()
    vertex(upStartX, cy)
    quadraticVertex(cx, cy - upArcH, upEndX, cy)
    endShape()
    noStroke()
    fill(0)
    circle(upStartX, cy, 40)
    circle(upEndX, cy, 40)

    // lower lid
    noFill()
    stroke(0)
    strokeWeight(30)
    beginShape()
    vertex(lowStartX, cy)
    quadraticVertex(cx, cy - lowArcH, lowEndX, cy)
    endShape()
    pop()

    // white masks
    noStroke()
    fill(255)
    beginShape()
    vertex(upMaskStartX, cy)
    quadraticVertex(cx, cy - upMaskArcH, upMaskEndX, cy)
    vertex(width, cy)
    vertex(width, 0)
    vertex(0, 0)
    vertex(0, cy)
    endShape(CLOSE)

    beginShape()
    vertex(lowMaskStartX, cy)
    quadraticVertex(cx, cy - lowMaskArcH, lowMaskEndX, cy)
    vertex(width, cy)
    vertex(width, height)
    vertex(0, height)
    vertex(0, cy)
    endShape(CLOSE)

    /* ---------- eyelashes (slightly wider) ---------- */
    const candidateCount = 9 // 7 visible, skip edges
    const lashLen = openness * 60
    const sweep = 60 // ← increased from 40
    stroke(0)
    strokeWeight(12)
    strokeCap(SQUARE)
    noFill()

    for (let i = 1; i < candidateCount - 1; i++) {
        // skip 0 and last
        const t = i / (candidateCount - 1)
        const bx =
            (1 - t) ** 2 * upStartX + 2 * (1 - t) * t * cx + t ** 2 * upEndX
        const by =
            (1 - t) ** 2 * cy + 2 * (1 - t) * t * (cy - upArcH) + t ** 2 * cy
        const dir = t - 0.5

        const ctrlX = bx + dir * sweep // flare outward first
        const ctrlY = by - lashLen * 0.35 // slight rise
        const tipX = bx + dir * sweep * 0.6 // then up
        const tipY = by - lashLen

        beginShape()
        vertex(bx, by)
        quadraticVertex(ctrlX, ctrlY, tipX, tipY)
        endShape()
    }
}
