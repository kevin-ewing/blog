let ballSize = 20; // Diameter of each ball
let gap = 2; // Gap between balls
let border = 100; // Border size
let cols, rows, offsetX, offsetY;
let balls = [];
let noiseScale = 0.005; // Controls the granularity of noise
let noiseDisplacement = 100
let noiseSpeed = 0.0025; // Controls the animation speed
let timeOffset = 0; // Changes over time for continuous motion

function setup() {
  createCanvas(windowHeight, windowHeight);
  calculateGrid();
  generateBalls();
}

function draw() {
  background(0);
  drawBalls();
  timeOffset += noiseSpeed; // Move through the noise field over time
}

function calculateGrid() {
  let totalSize = ballSize + gap;
  let availableWidth = width - 2 * border;
  let availableHeight = height - 2 * border;

  cols = floor(availableWidth / totalSize);
  rows = floor(availableHeight / totalSize);

  let usedWidth = cols * totalSize;
  let usedHeight = rows * totalSize;

  offsetX = (width - usedWidth) / 2;
  offsetY = (height - usedHeight) / 2;
}

function generateBalls() {
  balls = [];
  let totalSize = ballSize + gap;
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = offsetX + i * totalSize + ballSize / 2;
      let y = offsetY + j * totalSize + ballSize / 2;
      balls.push(createVector(x, y));
    }
  }
}

function drawBalls() {
  fill(255,255,255,255);
  noStroke();
  for (let i = 0; i < balls.length; i++) {
    let ball = balls[i];
    let noiseX = noise(ball.x * noiseScale, ball.y * noiseScale, timeOffset);
    let noiseY = noise(ball.y * noiseScale, ball.x * noiseScale, timeOffset);
    let displacementX = map(noiseX, 0, 1, -noiseDisplacement, noiseDisplacement);
    let displacementY = map(noiseY, 0, 1, -noiseDisplacement, noiseDisplacement);
    
    ellipse(ball.x + displacementX, ball.y + displacementY, ballSize);
  }
}

function windowResized() {
  resizeCanvas(windowHeight, windowHeight);
  calculateGrid();
  generateBalls();
}
