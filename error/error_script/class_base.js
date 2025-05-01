class TumbleBase {
  constructor() {
    this.lets = [];

    this.build();
  }

  build() {
    var leading = 10;
    var tracking = 0;


    maxDist = 0;

    for (var p = 0; p < inputText.length; p++) {
      for (var m = 0; m < inputText[p].length; m++) {
        var nextW = textWidth(inputText[p].substring(0, m + 1));
        var thisW = textWidth(inputText[p].charAt(m));

        var x = nextW - thisW;
        var y = p * pgTextSize * tFontFactor;

        x -= (textWidth(inputText[p]) + (inputText[p].length - 1) * tracking) / 2;
        x += (m - 1) * tracking;

        y -= -pgTextSize * tFontFactor + inputText.length * pgTextSize * tFontFactor / 2;
        y -= (inputText.length - 1) * leading / 2;
        if (p > 0) {
          y += (p) * leading;
        }

        if (inputText[p].charAt(m) != " ") {
          this.lets[this.lets.length] = new TumbleLet(x, y, p, m);

          var meas = dist(x, y, mouseCenter.x, mouseCenter.y);
          if (meas > maxDist) {
            maxDist = meas;
          }
        }
      }
    }

    this.liveReset();
    this.tickerReset();
  }

  run() {
    for (var m = 0; m < this.lets.length; m++) {
      this.lets[m].run();
    }

    // this.resetDetect();
  }

  liveReset() {
    for (var m = 0; m < this.lets.length; m++) {
      this.lets[m].liveReset();
    }
  }

  tickerReset() {
    for (var m = 0; m < this.lets.length; m++) {
      this.lets[m].tickerReset();
    }
  }
}