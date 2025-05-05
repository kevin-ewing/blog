# Cube

Okay, as the title suggests, let's get started with a cube. It's pretty simple, just create 3 polygons. Let me look up the math to do that.

![image](./resources/o1.jpg)

That looks about right, wouldn't you say. Black and gray is pretty boring though. Let me add solid colors to give myself a better understanding of the shape.

![image](./resources/o2.jpg)

That is better for now. I will be changing it at some point, but for now it gives a clearer sense of how noise will affect the color. Which is exactly what I am going to add next -- noise.

![image](./resources/o3.jpg)

Oops, I got distracted. I didn't love the simplicity of the single cube so wanted to add some more visual interest. Now we have two stacked blocks that together almost make a cube.

Now we are going to move onto actually adding uniform noise to the image. Each pixel of the canvas will be read, and noise will randomly be added to each color channel. This creates good variety and colorful noise almost like static.

![image](./resources/o4.jpg)

Static is added. However, it certianly lights up the black. Let me add logic to the noise function to only act on already colored pixels. This will keep the background black. It will hopefully also make the cube jump out more and the noise seem more intentional.

![image](./resources/o5.jpg)

What do you think? I think? Let's make the panel colors random. I will initialize a base color in the canvas set up, and each panel will be a slightly different hue and saturation. Let me see how that looks

![image](./resources/o6.jpg)

Looking good. Here's another.

![image](./resources/o7.jpg)

I would really like the sides to be a gradient rather than a solid block. Normal 2D p5js canvases don't support filling polygons with gradients, but if I write the cubes to a WebGL off-screen graphic then write that image to the canvas I should be able to achieve the gradient sides.

![image](./resources/o8.jpg)

Oops, looks like I uncovered a bug with my noise function. Let me fix that real quick...

## Final Images

I have got more final images this time than I have in the past. I think that is because I kept refreshing the palette and being impressed with the final image. There is something so pleasant about them.

![image](./resources/f1.jpg)

![image](./resources/f2.jpg)

![image](./resources/f3.jpg)

![image](./resources/f4.jpg)

![image](./resources/f5.jpg)

![image](./resources/f6.jpg)

## Source Code

```js
let pg
let palette = []
const NOISE_DIFF = 80

function setup() {
    createCanvas(windowHeight, windowHeight) // 2D main canvas
    pixelDensity(1)
    noLoop()
    noStroke()

    // Create offscreen WEBGL buffer
    pg = createGraphics(windowHeight, windowHeight, WEBGL)
    pg.noStroke()

    // Init palette
    pg.colorMode(HSB, 360, 100, 100)
    let baseHue = random(0, 360)
    for (let i = 0; i < 4; i++) {
        let hue = (baseHue + i * random(10, 60)) % 360
        palette.push(pg.color(hue, random(60, 100), random(70, 100)))
    }
    pg.colorMode(RGB, 255)
}


function draw() {
    pg.clear()
    let cubeSize = (3 / 5) * width
    drawCube(pg, width / 2, height / 2 + (cubeSize * 0.2), cubeSize)
    drawCube(pg, width / 2, height / 2 - (cubeSize * 0.2), cubeSize)

    image(pg, 0, 0) // draw WEBGL canvas to 2D main canvas

    addNoise()
}

function drawCube(g, cx, cy, size) {
    let yScale = 0.3
    let half = size / 2
    let yOffset = half * yScale

    let top = [
        [cx, cy - yOffset * 2],
        [cx + half, cy - yOffset],
        [cx, cy],
        [cx - half, cy - yOffset],
    ]
    let left = [
        [cx - half, cy - yOffset],
        [cx, cy],
        [cx, cy + yOffset * 2],
        [cx - half, cy + yOffset],
    ]
    let right = [
        [cx, cy],
        [cx + half, cy - yOffset],
        [cx + half, cy + yOffset],
        [cx, cy + yOffset * 2],
    ]

    drawGradientFace(g, top)
    drawGradientFace(g, left)
    drawGradientFace(g, right)
}

function drawGradientFace(g, points) {
    g.beginShape()
    for (let pt of points) {
        let c1 = random(palette)
        let c2 = random(palette)
        let amt = random()
        let c = g.lerpColor(c1, c2, amt)
        g.fill(c)
        g.vertex(pt[0] - width / 2, pt[1] - height / 2)
    }
    g.endShape(CLOSE)
}


function addNoise() {
    loadPixels()
    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
            let index = (i + j * width) * 4
            let r = pixels[index]
            let g = pixels[index + 1]
            let b = pixels[index + 2]

            if (r !== 0 || g !== 0 || b !== 0) {
                r += random(-NOISE_DIFF, NOISE_DIFF)
                g += random(-NOISE_DIFF, NOISE_DIFF)
                b += random(-NOISE_DIFF, NOISE_DIFF)

                pixels[index] = constrain(r, 0, 255)
                pixels[index + 1] = constrain(g, 0, 255)
                pixels[index + 2] = constrain(b, 0, 255)
            }
        }
    }
    updatePixels()
}

```
