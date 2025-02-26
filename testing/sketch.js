const MIDDLE = 300;
const RADIUS = 400;
const NUM_POINTS = 3;
const COLORS = ["#0e517e99", "#20a69499", "#f0e87a99"]
function setup() {
    createCanvas(windowWidth, windowHeight);
    blendMode(MULTIPLY)
    noFill();
    background(0, 0); // Transparent background
  }
  
  function draw() {
    clear(); // Ensures transparency remains
    
    let cx = width / 2;
    let cy = height / 2;
    
    let curve = [];
    for (let i = 0; i < 5; i++) {
      curve.push({ x: cx + random(-MIDDLE, MIDDLE), y: cy + random(-MIDDLE, MIDDLE) });
    }
  
    let t = 0;
    for (let i = 0; i < NUM_POINTS; i++) {
      let p = lerpPoints(curve, t);
      fill(color(COLORS[i])); // Semi-transparent circles
      noStroke();
      ellipse(p.x, p.y, RADIUS);
      t += random(0.2, 0.5); // Uneven spacing along curve
    }
  
    noLoop();
  }
  
  function lerpPoints(points, t) {
    if (points.length == 1) return points[0];
    let newPoints = [];
    for (let i = 0; i < points.length - 1; i++) {
      let x = lerp(points[i].x, points[i + 1].x, t);
      let y = lerp(points[i].y, points[i + 1].y, t);
      newPoints.push({ x, y });
    }
    return lerpPoints(newPoints, t);
  }
  