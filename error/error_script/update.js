const MAX_SIZE = 200
let TEXT = "Error\n404";

function setText() {
  inputText = TEXT.match(/[^\r\n]+/g);

  coreCount = inputText.length;
  findMaxSize();
  createAnimation();
}

function findMaxSize() {
  var leading = 10;
  var testerSize = 100;
  textSize(testerSize);
  textFont(tFont);
  var longestLine = 0;
  var measurer = 0;

  for (var m = 0; m < inputText.length; m++) {
    var tapeMeasurer = textWidth(inputText[m]);
    if (tapeMeasurer > measurer) {
      longestLine = m;
      measurer = tapeMeasurer;
    }
  }

  var widthTest = wWindow;
  let sizeHolder = 2;
  let holdW = 0;

  while (holdW < widthTest) {
    textSize(sizeHolder);
    holdW = textWidth(inputText[longestLine]);
    sizeHolder += 2;
  }
  pgTextSize = sizeHolder;

  var heightTest = (height - 100) - (inputText.length - 1) * leading;
  let holdH = inputText.length * sizeHolder * tFontFactor;
  while (holdH > heightTest) {
    holdH = inputText.length * sizeHolder * tFontFactor;
    sizeHolder -= 2;
  }
  pgTextSize = min(sizeHolder, MAX_SIZE);

  textSize(pgTextSize);
  fullH = inputText.length * pgTextSize * tFontFactor + (inputText.length - 1) * leading;
  fullW = textWidth(inputText[longestLine]);
}

function createAnimation() {
  coreBase = null;
  coreBase = new TumbleBase();
}