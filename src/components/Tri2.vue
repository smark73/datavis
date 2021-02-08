<template>
  <div class="wrap">
      <canvas id="myCanvas" ></canvas>
    </div>
</template>

<script>
import * as api from './api';
export default {
  name: 'Tri2',
  methods: {
    animate () {
      if(this.windowFocus !== false){
        requestAnimationFrame(this.animate);
      } else {
        console.log('window out of focus');
      }
      // gradient bg that isn't solid, shows pixelation
      // let bg = this.c.createLinearGradient(0, 0, 0, this.canvas.height);
      // let bgColor = this.getBgColor;
      // bg.addColorStop(0, 'rgba(50,50,50,.2)');
      // bg.addColorStop(.5, 'rgba(10,10,10,1');
      // bg.addColorStop(1, 'rgba(50,50,50,.2)');
      // this.c.fillStyle = bg;
      this.c.fillStyle = 'rgba(50,50,50,1)';
      this.c.fillRect(0,0,this.canvas.width,this.canvas.height);
      // for(let i = 0; i<this.shapeArray.length; i++){
      for(let i = 0; i<1; i++){
        this.shapeArray.forEach(shape => {
          if(shape.curValX <= 0){
            this.removeFromArray();
          } else {
            // this.c.save();
            shape.update();
            // this.c.restore();
          }
        })
      }
    },
    Shape(id, dataId, yearlyHigh, yearlyLow, prevHigh, prevLow, currentVal, prevVal, color1, color2, strokeColor, innerWidth, innerHeight, canvas) {
      this.id = id;
      this.dataId = dataId;
      this.yearlyHigh = yearlyHigh;
      this.yearlyLow = yearlyLow;
      this.prevHigh = prevHigh;
      this.prevLow = prevLow;
      this.currentVal = currentVal;
      this.prevVal = prevVal;
      this.color1 = color1;
      this.color2 = color2;
      this.strokeColor = strokeColor;
      this.innerWidth = innerWidth;
      this.innerHeight = innerHeight;
      this.canvas = canvas;

      // canvas top and bottom represent yearlyHigh, yearlyLow
      // place new values within that range
      // Px = each point on original chart
      // Pn = normalized point
      // R = range
      // Pn = ((Px - low)/R)*100

      let yRange = this.yearlyHigh - this.yearlyLow;
      let xWidth = this.innerWidth;

      this.flipY = function(y){
        return this.innerHeight - y;
      }

      this.yearlyHighX = -1;
      this.yearlyHighY = this.innerHeight;
      this.yearlyLowX = -1;
      this.yearlyLowY = -1;
      this.curValX = xWidth * 2;
      this.curValYin100 = ((this.currentVal - this.yearlyLow)/yRange)*100;
      this.curValY = this.innerHeight * this.curValYin100 / 100;

      // console.log('yH: ' + this.yearlyHigh);
      // console.log('yL: ' + this.yearlyLow);
      // console.log('normalize: ' + this.curValYin100);
      // console.log('y in canvas: ' + this.curValY);
      // console.log('current: ' + this.currentVal);
      // console.log('low: ' + this.yearlyLow);
      // console.log('range: ' + yRange);
      // console.log('height: ' + this.innerHeight);

      this.draw = function() {
        this.canvas.save();
        //draw triange
        this.canvas.beginPath();
        this.canvas.moveTo(this.yearlyHighX, this.flipY(this.yearlyHighY));
        this.canvas.lineTo(this.yearlyLowX, this.flipY(this.yearlyLowY));
        this.canvas.lineTo(this.curValX, this.flipY(this.curValY));
        this.canvas.lineTo(this.yearlyHighX, this.flipY(this.yearlyHighY));
        let shapeFill = this.canvas.createLinearGradient(0, 0, this.innerWidth, 0);
        shapeFill.addColorStop(0, this.color1);
        shapeFill.addColorStop(1, this.color2);
        this.canvas.fillStyle = shapeFill;
        // this.canvas.shadowColor = strokeColor;
        // this.canvas.shadowBlur = 10;
        this.canvas.fill();
        this.canvas.closePath();
        this.canvas.strokeStyle = strokeColor;
        this.canvas.stroke();
        this.canvas.fillStyle = 'white';
        this.canvas.font = '20px sans-serif';
        let shapeInfo= this.id + " " + this.dataId;
        this.canvas.fillText(shapeInfo, this.curValX, this.flipY(this.curValY));
        this.canvas.restore();
      }
      this.update = function() {
        this.draw();
        this.curValX -= 2;
      }
    },
    removeFromArray () {
      // console.log(this.shapeArray);
      // console.log(index);
      // this.shapeArray = this.shapeArray.slice(index, index+1);
      this.shapeArray = this.shapeArray.shift();
      // console.log(this.shapeArray);
    }
  },
  mounted: function() {
    window.addEventListener("focus", function(){
      this.windowFocus = true;
      // console.log('ON');
    });
    window.addEventListener("blur", function(){
      this.windowFocus = false;
      // console.log('OFF');
    });

    this.canvas = document.getElementById('myCanvas');
    this.canvas.width = this.innerWidth;
    this.canvas.height = this.innerHeight;
    this.c = this.canvas.getContext('2d');
    const canvas = this.c;
    // this.data = this.getData();
    const data = this.getData();
    const shapeArray = this.shapeArray;
    const shape = this.Shape;
    let innerWidth = this.innerWidth;
    let innerHeight = this.innerHeight;

    // const upOrDown = this.upOrDown;
    // function setUpOrDown(curVal, prevVal){
    //   if(curVal > prevVal) {
    //     upOrDown = 'up';
    //   } else if (curVal < prevVal) {
    //     upOrDown = 'down';
    //   }
    //   // console.log(upOrDown);
    // }
    let colorGreen = this.colorGreen;
    let colorRed = this.colorRed;

    function pushDataIntoArray(dataIndex) {
      let i = dataIndex;
      let id = i;
      let yearlyHigh = data[i].yearHigh;
      let yearlyLow = data[i].yearLow;
      let prevHigh = data[i].dayHigh;
      let prevLow = data[i].dayLow;
      let currentVal = data[i].price;
      let prevVal = data[i].prevPrice;
      let dataId = data[i].dataId;
      // let color1 = 'rgba(255,255,255,0)';
      // let color2 = 'rgba(255,255,255,.07)';
      //this alpha causes artifacts 
      // let color1 = 'rgba(50,50,50,0)';
      // let color2 = 'rgba(50,50,50,.01)';
      let color1 = 'rgba(50,50,50,0)';
      let color2 = 'rgba(50,50,50,0)';
      let strokeColor =  currentVal > prevVal ? colorGreen : colorRed;
      // console.log(currentVal, prevVal, strokeColor);
      
      // setUpOrDown(currentVal,prevVal);

      // if(currentVal > prevVal) {
      //   color = 'rgba(0,255,0,.1)';
      //   // color2 = 'rgba(0,255,0,.01)';
      // } else {
      //   color = 'rgba(255,0,0,.1)';
      //   // color2 = 'rgba(255,0,0,.01)';
      // }

      shapeArray.push(new shape(
        id,
        dataId,
        yearlyHigh,
        yearlyLow,
        prevHigh,
        prevLow,
        prevVal,
        currentVal,
        color1,
        color2,
        strokeColor,
        innerWidth,
        innerHeight,
        canvas
      ));
    }

    let dataIndex = 0;
    setInterval(function(){
      // console.log(windowFocus);
      // console.log(shapeArray);
      if(this.windowFocus) {
        pushDataIntoArray(dataIndex);
        if(dataIndex + 1 < data.length) {
          dataIndex++;
        } else {
          dataIndex = 0;
        }
      }
    }, 5000);

    this.windowFocus = true;
    this.animate(canvas);
  },
  data () {
    return {
      windowFocus: Boolean,
      shape: {},
      shapeArray: [],
      data: {},
      upOrDown: String,
      colorRed: 'hsl(359, 85%, 38%)',
      colorGreen: 'hsl(80, 85%, 47%)',
    }
  },
  computed: {
    innerWidth: function() { return innerWidth; },
    innerHeight: function() { return innerHeight },
    getData: function() { return api.getData2 },
    // getBgColor: function() { return this.upOrDown === 'up' ? this.colorGreen : this.colorRed }
  }
}
</script>


<style scoped>
  .wrap {
    background: #000;
    width: 100%;
    height: 100%;
  }
</style>
