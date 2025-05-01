class TumbleLet {
  constructor(x, y, coreNumber, index) {
    textSize(pgTextSize);
    textFont(tFont);

    this.x = x;
    this.y = y;

    this.xAct, this.xTar;
    this.yAct, this.yTar, this.yRotReturn;
    this.zAct, this.zTar;
    this.xRotAct, this.xRotTar, this.xRotBase;
    this.yRotAct, this.yRotTar, this.yRotBase;
    this.zRotAct, this.zRotTar, this.zRotBase;
    this.dAct, this.dTar;
    this.swAct, this.swTar;

    this.coreNumber = coreNumber;
    this.index = index;

    this.l = inputText[coreNumber].charAt(this.index);
    this.w = textWidth(this.l);

    this.h = pgTextSize * tFontFactor;

    this.coreTicker = 0;
    this.ticker = 0;

    this.p;

    this.mode;

    this.cols = [];

    this.build();
    this.runReset();
  }

  build() {
    textFont(tFont);

    this.p = myFont.getPath(this.l, 0, 0, pgTextSize);

    // console.log(this.p);
  }

  runReset() {
    this.tickerReset();

    this.xRotBase = random(-PI / 10, PI / 10);
    this.yRotBase = random(-PI / 12, PI / 12);
    this.zRotBase = random(-PI / 6, PI / 6);

    this.liveReset();

    for (var p = 0; p < this.p.commands.length; p++) {
      this.cols[p] = round(random(colorSet.length - 1));
    }
  }

  tickerReset() {
    var tkDist = dist(mouseCenter.x, mouseCenter.y, this.x + this.w / 2, this.y - this.h / 2);
    this.ticker = map(tkDist, 0, maxDist, 0, maxDelay);
    this.coreTicker = 0;

    // console.log(maxDist);
  }

  liveReset() {
    this.xTar = 0;
    this.yTar = 0;
    this.zTar = 0;
    this.xRotTar = 0;
    this.yRotTar = 0;
    this.yRotReturn = 0;
    this.zRotTar = 0;

    ////////////////////////////// TUMBLE
    this.xRotTar = tumbleAmount * this.xRotBase;
    this.yRotTar = tumbleAmount * this.yRotBase;
    this.zRotTar = tumbleAmount * this.zRotBase;

    this.dTar = tumbleDepthLength;
    this.zTar = -this.dTar / 2 + this.index % 2 * this.dTar;
  }

  run() {
    this.update();
    push();
    translate(this.x, this.y);
    translate(this.xAct, this.yAct, this.zAct);

    translate(this.w / 2, -this.h / 2, this.dAct / 2);
    rotateX(this.xRotAct);
    rotateY(this.yRotAct);
    rotateZ(this.zRotAct);
    translate(-this.w / 2, this.h / 2, -this.dAct / 2);

    this.displayShape();
    if (strokeOnToggle) {
      this.displaySkel();
    }
    this.displayExtrudePatch();
    pop();
  }

  update() {
    this.coreTicker++;
    this.ticker++;

    if (this.ticker < 0) {
      this.xAct = 0;
      this.yAct = 0;
      this.zAct = 0;
      this.xRotAct = 0;
      this.yRotAct = 0;
      this.zRotAct = 0;
      this.dAct = 0;

    } else if (this.ticker < animA) {
      var tk0 = map(this.ticker, 0, animA, 0, 1);
      var tk1 = stageAaccel(tk0);

      this.xAct = map(tk1, 0, 1, 0, this.xTar);
      this.yAct = map(tk1, 0, 1, 0, this.yTar);
      this.zAct = map(tk1, 0, 1, 0, this.zTar);
      this.xRotAct = map(tk1, 0, 1, 0, this.xRotTar);
      this.yRotAct = map(tk1, 0, 1, 0, this.yRotTar);
      this.zRotAct = map(tk1, 0, 1, 0, this.zRotTar);
      this.dAct = map(tk1, 0, 1, 0, this.dTar);

    } else if (this.ticker < animB) {
      this.xAct = this.xTar;
      this.yAct = this.yTar;
      this.zAct = this.zTar;
      this.xRotAct = this.xRotTar;
      this.yRotAct = this.yRotTar;
      this.zRotAct = this.zRotTar;
      this.dAct = this.dTar;

    } else if (this.ticker < animC) {
      var tk0 = map(this.ticker, animB, animC, 0, 1);
      var tk1 = stageBaccel(tk0);

      this.xAct = map(tk1, 0, 1, this.xTar, 0);
      this.yAct = map(tk1, 0, 1, this.yTar, 0);
      this.zAct = map(tk1, 0, 1, this.zTar, 0);
      this.xRotAct = map(tk1, 0, 1, this.xRotTar, 0);
      this.yRotAct = map(tk1, 0, 1, this.yRotTar, this.yRotReturn);
      this.zRotAct = map(tk1, 0, 1, this.zRotTar, 0);
      this.dAct = map(tk1, 0, 1, this.dTar, 0);

    } else {
      this.xAct = 0;
      this.yAct = 0;
      this.zAct = 0;
      this.xRotAct = 0;
      this.yRotAct = this.yRotReturn;
      this.zRotAct = 0;
      this.dAct = 0;

    }

    if (this.coreTicker >= animC + abs(maxDelay * 2)) {
      this.runReset();
    }
  }

  displayType() {
    push();
    translate(this.w / 2, 0);

    noStroke();
    fill(textColor);
    textAlign(CENTER);
    textFont(tFont);
    textSize(pgTextSize);
    text(this.l, 0, 0);
    pop();
  }

  displayShape() {
    // var strokeRepeats = 1;

    // if(strokeOnToggle){
    var strokeRepeats = 2;
    // }

    for (var m = 0; m < strokeRepeats; m++) {        ////// DISPLAY 0: FRONT AND 1: BACK
      push();
      translate(0, 0, m * this.dAct);

      for (var r = 0; r < strokeRepeats; r++) {     ////// DISPLAY 0: FILL AND 1: STROKE
        var openContour = false;

        if (strokeOnToggle) {
          if (r == 0) {
            strokeWeight(strokeW);
            stroke(strokeColor);
            noFill();
          } else {
            translate(0, 0, -0.5);
            noStroke();
            if (capsOnToggle) {
              fill(textColor);
            } else {
              noFill();
            }
          }
        } else {
          noStroke();
          if (capsOnToggle) {
            fill(textColor);
          } else {
            noFill();
          }
        }

        var closePoint = 0;
        for (var i = 0; i < this.p.commands.length; i++) {
          if (this.p.commands[i].type == "M") {
            if (i > 0) {
              beginContour();
              openContour = true;
            } else {
              beginShape(TESS);
            }
            vertex(this.p.commands[i].x, this.p.commands[i].y);
          }

          if (this.p.commands[i].type == "Z") {
            if (openContour) {
              endContour();
            }
            if (i == this.p.commands.length - 1) {
              endShape(CLOSE);
            }
            point(this.p.commands[closePoint].x, this.p.commands[closePoint].y);
            closePoint = i + 1;
          }

          if (this.p.commands[i].type == "L") {
            vertex(this.p.commands[i].x, this.p.commands[i].y);
          }

          if (this.p.commands[i].type == "Q") {
            quadraticVertex(
              this.p.commands[i].x1,
              this.p.commands[i].y1,
              this.p.commands[i].x,
              this.p.commands[i].y
            );
          }

          if (this.p.commands[i].type == "C") {
            bezierVertex(
              this.p.commands[i].x1,
              this.p.commands[i].y1,
              this.p.commands[i].x2,
              this.p.commands[i].y2,
              this.p.commands[i].x,
              this.p.commands[i].y
            );
            vertex(
              this.p.commands[i].x,
              this.p.commands[i].y
            );
          }
        }
      }
      pop();
    }
  }

  displayExtrudePatch() {
    noStroke();

    var closePoint = 0;
    for (var i = 0; i < this.p.commands.length; i++) {
      fill(colorSet[this.cols[i]]);
      
      if (this.p.commands[i].type == "M") {
      }

      if (this.p.commands[i].type == "Z") {
        beginShape(TRIANGLE_STRIP);
        vertex(this.p.commands[i - 1].x, this.p.commands[i - 1].y, 0);
        vertex(this.p.commands[i - 1].x, this.p.commands[i - 1].y, this.dAct);

        vertex(this.p.commands[closePoint].x, this.p.commands[closePoint].y, 0);
        vertex(this.p.commands[closePoint].x, this.p.commands[closePoint].y, this.dAct);
        endShape();

        closePoint = i + 1;
      }

      if (this.p.commands[i].type == "L") {
        beginShape(TRIANGLE_STRIP);
        vertex(this.p.commands[i - 1].x, this.p.commands[i - 1].y, 0);
        vertex(this.p.commands[i - 1].x, this.p.commands[i - 1].y, this.dAct);

        vertex(this.p.commands[i].x, this.p.commands[i].y, 0);
        vertex(this.p.commands[i].x, this.p.commands[i].y, this.dAct);
        endShape();
      }

      if (this.p.commands[i].type == "Q") {
        beginShape(TRIANGLE_STRIP);
        for (var r = 0; r < res; r++) {
          var thisT = r / (res - 1);
          var thisX = quadLerp(this.p.commands[i - 1].x, this.p.commands[i].x1, this.p.commands[i].x, thisT);
          var thisY = quadLerp(this.p.commands[i - 1].y, this.p.commands[i].y1, this.p.commands[i].y, thisT);

          vertex(thisX, thisY, 0);
          vertex(thisX, thisY, this.dAct);
        }
        endShape();
      }

      if (this.p.commands[i].type == "C") {
        beginShape(TRIANGLE_STRIP);
        for (var r = 0; r < res; r++) {
          var thisT = r / (res - 1);
          var thisX = bezierPoint(this.p.commands[i - 1].x, this.p.commands[i].x1, this.p.commands[i].x2, this.p.commands[i].x, thisT);
          var thisY = bezierPoint(this.p.commands[i - 1].y, this.p.commands[i].y1, this.p.commands[i].y2, this.p.commands[i].y, thisT);

          vertex(thisX, thisY, 0);
          vertex(thisX, thisY, this.dAct);
        }
        endShape();
      }

    }
  }

  displaySkel() {
    push();
    translate(0, 0, -1);
    noFill();
    stroke(strokeColor);
    strokeWeight(strokeW);

    for (var i = 0; i < this.p.commands.length; i++) {
      if (this.p.commands[i].type != "Z") {
        line(
          this.p.commands[i].x, this.p.commands[i].y, 0,
          this.p.commands[i].x, this.p.commands[i].y, this.dAct
        );
      }
    }
    pop();
  }
}
