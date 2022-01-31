// Stèv Animated Text
// version without mouse interaction to avoid conflict when embedded in iframe
// and adding a clickable link (ie. to Homepage)

let rate = 3;

let upperBound;
let lowerBound;

let numberOfRectangles = 4;
let shape = [];

let textArray = ['S', 'T', 'È', 'V', '‘s', 't', 'ɛ', 'v', 'ス', 'テ', 'ー', 'ヴ']
let textArrayNumberOfSymbols = (textArray.length - 1);
let textCenterCalibrationCoeff = 1.35;

// rectangle + text class
class drawRectangle {  
  constructor(offset) {
    this.offset = offset;
    this.textArrayOffset = offset;
    this.textIndex = this.offset + 1;
    
    this.initAlpha = 0;
    this.currentAlpha = 0;
    this.finalAlpha = 255;
    this.size = width/numberOfRectangles;
    this.textPositionX = this.textIndex * this.size - (this.size/2);
    this.leftBound = offset * this.size;
    this.rightBound = this.leftBound + this.size;
  }

  
  changeCharacter() {
    if (random(100000) > 99500) {
      this.currentAlpha = this.finalAlpha;
      this.textArrayOffset += 4;
      }
    
    /*
    if (this.leftBound < mouseX &&
        mouseX < this.rightBound &&
        mouseY < lowerBound &&
        mouseY > upperBound &&
        frameCount%rate == 0) {
      this.currentAlpha = this.finalAlpha;
      this.textArrayOffset += 4;
    } */

    if (this.textArrayOffset > this.offset+9) {
      this.textArrayOffset = this.offset;
    }
  }
  
  backToWhite() {
     this.currentAlpha = lerp(this.currentAlpha,
                              this.initAlpha,
                              random(0.03, 0.1));
  }
  
  showText() {
    if (this.textArrayOffset < 5) {
      textSize(25);
    } else if (this.textArrayOffset < 7) {
      textSize(28);
    } else if (this.textArrayOffset > 7) {
      textSize(24);
    }
    
    textFont('Arial');
    textAlign(CENTER);
    
    //draw white text
    fill(255, 255, 255, this.currentAlpha);
    text(textArray[this.textArrayOffset],
         this.textPositionX,
         lowerBound/textCenterCalibrationCoeff); 
  
    //draw black text
    fill(0, 0, 0, 255-this.currentAlpha);
    text(textArray[this.textArrayOffset],
         this.textPositionX,
         lowerBound/textCenterCalibrationCoeff); 
      }

  
  showRect() {
    fill(0, 0, 0, this.currentAlpha);
    rect(this.leftBound, upperBound, this.size, lowerBound);
    }
}

//-----------
function setup() {
  createCanvas(95, 40);
  noStroke();
  
  upperBound = 1;
  lowerBound = height - 2;
  
   for (i = 0; i < 4; i ++) {
     shape[i] = new drawRectangle(i);
   }
   
}

function draw() {
  background(255);
  
  // draw rectangles
  for (i = 0; i < 4; i ++) {
    shape[i].backToWhite();
    shape[i].changeCharacter();
    shape[i].showRect();
    shape[i].showText();
  }    
}