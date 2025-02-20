const NOISE_SCALE = 0.01;
const NUMBER_LINES = 500000;
const BOARDER = 40;
let offsetX, offsetY, offsetZ, offsetColor;
let paletteColors = [];

function preload() {
  // Replace these with actual palette file paths in the 'palette' subdirectory
  let palettes = [
    "palette/pal1.hex",
    "palette/pal2.hex",
    "palette/pal3.hex",
    "palette/pal4.hex",
    "palette/pal5.hex",
    "palette/pal6.hex",
];
  paletteColors = loadStrings(random(palettes));
}

function setup() {
  createCanvas(windowHeight, windowHeight);
  background(0);
  noFill();
  strokeWeight(0.025);
  noLoop();

  offsetX = random(10000);
  offsetY = random(10000);
  offsetZ = random(10000);
  offsetColor = random(10000);
}

function draw() {
  background(0);
  for (let i = 0; i < NUMBER_LINES; i++) {
    let x = random(BOARDER, width - BOARDER);
    let y = random(BOARDER, height - BOARDER);

    let len = noise((x + offsetX) * NOISE_SCALE * 0.1, (y + offsetY) * NOISE_SCALE * 0.1) * 60 + 10;
    let angle = noise((x + offsetZ) * NOISE_SCALE, (y + offsetZ) * NOISE_SCALE) * TWO_PI;
    let colorIndex = floor(
      noise((x + offsetColor) * NOISE_SCALE * 0.25, (y + offsetColor) * NOISE_SCALE * 0.25) * paletteColors.length
    );
    stroke("#" + paletteColors[colorIndex]);

    let x2 = x + cos(angle) * len;
    let y2 = y + sin(angle) * len;
    line(x, y, x2, y2);
  }
}

function windowResized() {
  resizeCanvas(windowHeight, windowHeight);
  redraw();
}
