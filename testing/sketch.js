let pg
let cols, rows
let spacing = 40
let noiseScale = 0.05
let abOffset = 6 // offset magnitude
let opacity = 256 // tint opacity
let abAngle // random aberration vector
let maxDist // max distance to canvas centre

function setup() {
    createCanvas(windowHeight, windowHeight)

    pg = createGraphics(windowHeight, windowHeight)
    pg.clear()
    pg.noFill()
    pg.strokeWeight(2)
    pg.stroke(255)

    cols = int(width / spacing)
    rows = int(height / spacing)

    abAngle = random(TWO_PI) // random offset direction
    maxDist = dist(0, 0, width / 2, height / 2) // for centre weighting

    drawCurvyLines(pg)
    noLoop()
}

function draw() {
    background(255)
    blendMode(MULTIPLY)

    const dx = cos(abAngle) * abOffset
    const dy = sin(abAngle) * abOffset

    tint(0, 255, 255, opacity) // cyan
    image(pg, -2 * dx, -2 * dy)

    tint(0, 0, 255, opacity) // blue
    image(pg, -dx, -dy)

    tint(255, 0, 0, opacity) // red
    image(pg, dx, dy)

    tint(255, 255, 0, opacity) // yellow
    image(pg, 2 * dx, 2 * dy)

    blendMode(BLEND)

    tint(0) // crisp black top-layer
    image(pg, 0, 0)
    tint(255) // reset
}

function drawCurvyLines(g) {
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let baseX =
                i * spacing + spacing / 2 + random(-spacing / 10, spacing / 10)
            let baseY =
                j * spacing + spacing / 2 + random(-spacing / 10, spacing / 10)

            const segments = 16

            // distance weighting toward canvas centre
            const d = dist(baseX, baseY, width / 2, height / 2)
            const cFactor = 1 - d / maxDist // 0 (edge) → 1 (centre)

            // longer, wilder lines near centre
            let lengthNoise = noise(i * noiseScale, j * noiseScale + 400)
            let lineLength = map(lengthNoise, 0, 1, 60, 140) * (1 + cFactor * 2)

            g.beginShape()
            for (let k = -1; k <= segments + 1; k++) {
                const t = k / segments
                const n = noise((i + t) * noiseScale, (j + t) * noiseScale)

                const angleAmp = 1 + cFactor // more curvature near centre
                const angle = map(n, 0, 1, -PI, PI) * angleAmp
                const r = t * lineLength

                g.curveVertex(baseX + cos(angle) * r, baseY + sin(angle) * r)
            }
            g.endShape()
        }
    }
}
