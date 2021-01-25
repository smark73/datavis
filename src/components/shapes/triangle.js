export const Shape = function (id, allTimeHigh, allTimeLow, prevHigh, prevLow, currentVal, prevVal, color1, color2, innerWidth, innerHeight, canvas) {
    this.id = id;
    this.allTimeHigh = allTimeHigh;
    this.allTimeLow = allTimeLow;
    this.prevHigh = prevHigh;
    this.prevLow = prevLow;
    this.currentVal = currentVal;
    this.prevVal = prevVal;
    this.color1 = color1;
    this.color2 = color2;
    this.innerWidth = innerWidth;
    this.innerHeight = innerHeight;
    this.canvas = canvas;
    const adjustHighLow = 100;
    this.ttl = 10000;

    // canvas top and bottom represent allTimeHigh, allTimeLow
    // place new values within that range
    // prevHighY/100 = prevHigh/AllTimeHigh
    // prevLowY/100 prevLow/AllTimeLow
    // let prevHighY = this.prevHigh/this.allTimeHigh * 100;
    // let prevHighX = 0;
    // let prevLowY = this.prevLow/this.allTimeLow * 100;
    // let prevLowX = 0;
    let yRange = this.allTimeHigh - this.allTimeLow;
    this.curValY = (this.currentVal/yRange) * 100;
    this.curValX = this.innerWidth;
    this.allTimeHighX = 0;
    this.allTimeHighY = this.innerHeight;
    this.allTimeLowX = 0;
    this.allTimeLowY = 0;
    this.adjustedAllTimeHighY = this.allTimeHighY - adjustHighLow;
    this.adjustedAllTimeLowY = this.allTimeLowY - adjustHighLow;

    this.draw = function() {
      //draw triange
      this.canvas.beginPath();
      this.canvas.moveTo(this.allTimeHighX, this.adjustedAllTimeHighY);
      this.canvas.lineTo(this.allTimeLowX, this.adjustedAllTimeLowY);
      this.canvas.lineTo(this.curValX, this.curValY);
      this.canvas.lineTo(this.allTimeHighX, this.adjustedAllTimeHighY);
      // this.canvas.fillStyle = this.color;
      let shapeFill = this.canvas.createLinearGradient(0, 0, this.innerWidth, 0);
      shapeFill.addColorStop(0, this.color1);
      shapeFill.addColorStop(1, this.color2);
      this.canvas.fillStyle = shapeFill;
      this.canvas.fill();
      this.canvas.closePath();

      // let boxFill = this.canvas.createLinearGradient(0, this.yInit, 0, this.h);
      // boxFill.addColorStop(0, color2);
      // boxFill.addColorStop(.5, color1);
      // boxFill.addColorStop(1, color2);
    }
    this.update = function() {
      this.draw();
      console.log(this);
      // this.curValY = this.currentVal/(this.allTimeHigh-this.allTimeLow) * 100;
      this.curValX -= .2;
      this.allTimeHighX -= .2;
      // this.allTimeHighY = this.innerHeight;
      this.allTimeLowX -= .2;
      // this.allTimeLowY = 0;
      this.ttl -= 1000;
      if (this.ttl <= 0 ) {
        this.shapeArray.slice(0, this.id);
      }
    }
  }
