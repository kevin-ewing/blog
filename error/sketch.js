var bkgdColor, textColor, strokeColor;
var colorSet = [];

var inputText = [];
var tFont;
var tFontData;
var myFont;
var tFontFactor;
var starterText = "Error\n404";

var pgTextSize = 100;
var res = 8;

var culmLength = [];
var coreBase;
var baseAnimA = 80;
var animA = 80;     ////// INTRO
var baseAnimB = 0;
var animB = animA;     ////// STAY
var baseAnimC = 80;
var animC = animB + 80;     ////// OUTRO
var maxDelay = -20;

var stageAdirect = 2;
var stageAstrength = 3;

var stageBdirect = 2;
var stageBstrength = 3;

var wWindowMin, wWindowMax;
var scaler = 0.6;

var fullW, fullH;

var tumbleDepthLength = -75;
var tumbleAmount = .4;

var mouseCenter;
var maxDist = 100;

var capsOnToggle = true;
var strokeOnToggle = true;
var strokeW = 1.1;

var saveMode = 0;

var cwidth, cheight
var recMessageOn = false;
var frate = 30;
var recordedFrames = 0;
var numFrames = 300;

let camPos;

function preload() {
  tFont = loadFont("resources/FormulaCondensed-Bold.otf");
  tFontData = loadBytes("resources/FormulaCondensed-Bold.otf");
  tFontFactor = 0.82;
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  cwidth = width;
  cheight = height;

  mouseCenter = createVector(0, 0);
  camPos = createVector(0, 0);

  myFont = opentype.parse(tFontData.bytes.buffer);

  wWindowMin = width / 8,
    wWindowMax = width;
  wWindow = map(scaler, 0, 1, wWindowMin, wWindowMax);

  textColor = color('#ffffff');
  strokeColor = color('#000000');
  bkgdColor = color('#ffffff');

  colorSet[0] = color('#dee3e2');
  colorSet[1] = color('#fccbcb');
  colorSet[2] = color('#78b3d6');
  colorSet[3] = color('#d86969');
  colorSet[4] = color('#4f7969');


  frameRate(frate);
  curveDetail(res);

  strokeJoin(ROUND);
  strokeCap(ROUND);
  rectMode(CENTER);
  setText();
}

function draw() {
  // ortho();
  perspective();

  background(bkgdColor);
  push();
  coreBase.run();
  pop();
}

function quadLerp(p0, p1, p2, t) {
  return ((1 - t) * (1 - t)) * p0 + 2 * ((1 - t) * t * p1) + t * t * p2;
}

function windowResized() {
  resizeForPreview();
}

function resizeForPreview() {
  var tempWidth, tempHeight;

  if (saveMode == 0) {
    resizeCanvas(windowWidth, windowHeight, WEBGL);
  } else if (saveMode == 1) {
    if (windowWidth > windowHeight * 9 / 16) {
      tempHeight = windowHeight;
      tempWidth = windowHeight * 9 / 16;
    } else {
      tempWidth = windowWidth;
      tempHeight = windowWidth * 16 / 9;
    }
    resizeCanvas(tempWidth, tempHeight, WEBGL);
  } else if (saveMode == 2) {
    if (windowWidth < windowHeight) {
      tempWidth = windowWidth;
      tempHeight = windowWidth;
    } else {
      tempHeight = windowHeight;
      tempWidth = windowHeight;
    }
    resizeCanvas(tempWidth, tempHeight, WEBGL);
  }

  cwidth = width;
  cheight = height;

  wWindowMin = width / 8,
    wWindowMax = width;
  wWindow = map(scaler, 0, 1, wWindowMin, wWindowMax);

  setText();
}
