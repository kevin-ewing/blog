# Topology

![image](./resources/o1.jpg)
![image](./resources/o2.jpg)
![image](./resources/o3.jpg)
![image](./resources/o4.jpg)
![image](./resources/o5.jpg)
![image](./resources/o6.jpg)
![image](./resources/o7.jpg)
![image](./resources/o8.jpg)
![image](./resources/o9.jpg)
![image](./resources/o10.jpg)
![image](./resources/o11.jpg)

## Final Images

![image](./resources/f1.jpg)
![image](./resources/f2.jpg)
![image](./resources/f3.jpg)
![image](./resources/f4.jpg)

## Source Code

```js
let cols = 70
let rows = 70
let cubeSize = 40
let gap = 5
let noiseScale = 0.15
let noiseSpeed = 0.002
let heightFactor = 200
let baseHue
let pg

function setup() {
    createCanvas(windowHeight, windowHeight)
    pg = createGraphics(windowHeight, windowHeight, WEBGL)
    pg.angleMode(DEGREES)
    pg.colorMode(HSB, 360, 100, 100, 255)
    baseHue = random(360)
    noStroke()
    noLoop()
}

function draw() {
    // Draw to offscreen buffer
    pg.push()
    pg.clear()
    pg.ortho(-width / 2, width / 2, -height / 2, height / 2, -1000, 10000)
    const camDist = (cols + rows) * (cubeSize + gap) * 0.3
    pg.camera(camDist, -camDist, camDist, 0, 0, 0, 0, 1, 0)

    pg.translate(
        (-(cols - 1) * (cubeSize + gap)) / 2,
        0,
        (-(rows - 1) * (cubeSize + gap)) / 2
    )

    for (let z = 0; z < rows; z++) {
        for (let x = 0; x < cols; x++) {
            const yOff = map(
                noise(x * noiseScale, z * noiseScale, frameCount * noiseSpeed),
                0,
                1,
                -heightFactor,
                heightFactor
            )
            const h = cubeSize * 10

            pg.push()
            pg.translate(x * (cubeSize + gap), yOff, z * (cubeSize + gap))
            drawColoredBox(pg, 0, 0, 0, cubeSize, h, cubeSize, yOff)

            pg.stroke(0)
            pg.strokeWeight(3)
            pg.noFill()
            pg.box(cubeSize + 0.5, cubeSize * 10 + 0.5, cubeSize + 0.5)
            pg.pop()
        }
    }
    pg.pop()

    // Render to main canvas
    image(pg, 0, 0)

    // Apply base hue tint noise
    loadPixels()
    for (let i = 0; i < pixels.length; i += 4) {
        let r = pixels[i]
        let g = pixels[i + 1]
        let b = pixels[i + 2]

        if (r !== 0 || g !== 0 || b !== 0) {
            let blendAmt = random(0.05, 0.4)
            let tintColor = color(baseHue, 100, 100)
            let tr = red(tintColor)
            let tg = green(tintColor)
            let tb = blue(tintColor)

            pixels[i] = lerp(r, tr, blendAmt)
            pixels[i + 1] = lerp(g, tg, blendAmt)
            pixels[i + 2] = lerp(b, tb, blendAmt)
        }
    }
    updatePixels()

    // texture effect
    drawDiagonalTexture()
}

function drawColoredBox(g, x, y, z, w, h, d, heightOffset) {
    const hw = w / 2
    const hh = h / 2
    const hd = d / 2
    const saturation = map(heightOffset, -heightFactor, heightFactor, 60, 0)

    g.beginShape(g.QUADS)

    // Front face
    g.fill((baseHue - 120 + 360) % 360, saturation * 0.6, 80)
    g.vertex(-hw, -hh, hd)
    g.vertex(hw, -hh, hd)
    g.vertex(hw, hh, hd)
    g.vertex(-hw, hh, hd)

    // Right face
    g.fill((baseHue + 120) % 360, saturation * 0.6, 70)
    g.vertex(hw, -hh, hd)
    g.vertex(hw, -hh, -hd)
    g.vertex(hw, hh, -hd)
    g.vertex(hw, hh, hd)

    // Top face
    g.fill(baseHue, saturation, 100)
    g.vertex(-hw, -hh, -hd)
    g.vertex(hw, -hh, -hd)
    g.vertex(hw, -hh, hd)
    g.vertex(-hw, -hh, hd)

    g.endShape()
}

function drawDiagonalTexture(spacing = 2, alpha = 40, angleDeg = 30) {
    push()
    translate(width / 2, height / 2)
    rotate(radians(angleDeg))
    stroke(0, 0, 100, alpha)
    strokeWeight(1)

    const len = sqrt(sq(width) + sq(height)) * 2

    for (let i = -len; i < len; i += spacing) {
        line(i, -len, i, len)
    }

    pop()
}
```
