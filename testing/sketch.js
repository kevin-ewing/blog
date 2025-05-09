// === tweakables ===
const CENTER_X   = 400;
const CENTER_Y   = 300;
const SPREAD_X   = 300;
const SPREAD_Y   = 150;
const DOT_ALPHA  = 100;
const DOT_COUNT  = 100;
const NOISE_DIFF = 30;

let palette = [];

function setup() {
  createCanvas(1000, 420);
  colorMode(HSB, 360, 100, 100, 255);
  pixelDensity(2);
  background(0);
  noStroke();
  blendMode(ADD);

  const baseHue = random(360);
  const baseSat = random(60, 100);
  for (let i = -2; i <= 2; i++) {
    let h = (baseHue + i * 20 + 360) % 360;
    let b = random(50, 100);
    palette.push(color(h, baseSat, b, DOT_ALPHA));
  }
  // Complementary
  palette.push(color((baseHue + 180) % 360, baseSat, random(50, 100), DOT_ALPHA));
}

function draw() {
  noLoop();
  for (let i = 0; i < DOT_COUNT; i++) {
    randomCircle();
  }
  addNoise();
}

function randomCircle() {
    const x = randomGaussian(CENTER_X, SPREAD_X);
    const y = randomGaussian(CENTER_Y, SPREAD_Y);
    const size = random(90, 160); // previously fixed at 80
    fill(random(palette));
    ellipse(x, y, size, size);
  }

function addNoise() {
  loadPixels();
  for (let i = 0; i < width*4; i++) {
    for (let j = 0; j < height*4; j++) {
      let index = (i + j * width) * 4;
      let r = pixels[index];
      let g = pixels[index + 1];
      let b = pixels[index + 2];

      if (r !== 0 || g !== 0 || b !== 0) {
        r += random(-NOISE_DIFF, NOISE_DIFF);
        g += random(-NOISE_DIFF, NOISE_DIFF);
        b += random(-NOISE_DIFF, NOISE_DIFF);

        pixels[index]     = constrain(r, 0, 255);
        pixels[index + 1] = constrain(g, 0, 255);
        pixels[index + 2] = constrain(b, 0, 255);
      }
    }
  }
  updatePixels();
}