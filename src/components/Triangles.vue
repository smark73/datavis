<template>
  <div class="wrap">
      <canvas id="myCanvas" ></canvas>
    </div>
</template>

<script>
import * as api from './api';
export default {
  name: 'Triangles',
  methods: {
    animate () {
      if(this.windowFocus){
        requestAnimationFrame(this.animate);
      }
      let bg = this.c.createLinearGradient(0, 0, 0, this.canvas.height);
      bg.addColorStop(0, 'rgba(35,45,55,.5)');
      bg.addColorStop(.5, 'rgba(55,155,55,.5)');
      bg.addColorStop(1, 'rgba(35,45,55,.5)');
      this.c.fillStyle = bg;
      this.c.fillRect(0,0,this.canvas.width,this.canvas.height);
      for(let i = 0; i<this.shapeArray.length; i++){
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
    Shape(id, yearlyHigh, yearlyLow, prevHigh, prevLow, currentVal, prevVal, color1, color2, innerWidth, innerHeight, canvas) {
      this.id = id;
      this.yearlyHigh = yearlyHigh;
      this.yearlyLow = yearlyLow;
      this.prevHigh = prevHigh;
      this.prevLow = prevLow;
      this.currentVal = currentVal;
      this.prevVal = prevVal;
      this.color1 = color1;
      this.color2 = color2;
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

      this.yearlyHighX = 0;
      this.yearlyHighY = this.innerHeight;
      this.yearlyLowX = 0;
      this.yearlyLowY = 0;
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
        this.canvas.fill();
        this.canvas.closePath();
        this.canvas.restore();
      }
      this.update = function() {
        this.draw();
        this.curValX -= 1;
      }
    },
    removeFromArray () {
      // console.log(i);
      this.shapeArray.shift();
      // console.log(this.shapeArray);
    }
  },
  mounted: function() {
    window.addEventListener("focus", function(){
      this.windowFocus = true;
    });
    window.addEventListener("blur", function(){
      this.windowFocus = false;
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

    function pushDataIntoArray(dataIndex) {
      let i = dataIndex;
      let id = i;
      let yearlyHigh = data[i].yearHigh;
      let yearlyLow = data[i].yearLow;
      let prevHigh = data[i].dayHigh;
      let prevLow = data[i].dayLow;
      let currentVal = data[i].price;
      let prevVal = data[i].prevPrice;

      let color1 = 'rgba(155,255,155,0)';
      let color2 = 'rgba(155,255,155,.1)';
      // if(currentVal > prevVal) {
      //   color = 'rgba(0,255,0,.1)';
      //   // color2 = 'rgba(0,255,0,.01)';
      // } else {
      //   color = 'rgba(255,0,0,.1)';
      //   // color2 = 'rgba(255,0,0,.01)';
      // }

      shapeArray.push(new shape(
        id,
        yearlyHigh,
        yearlyLow,
        prevHigh,
        prevLow,
        prevVal,
        currentVal,
        color1,
        color2,
        innerWidth,
        innerHeight,
        canvas
      ));
    }

    let dataIndex = 0;
    setInterval(function(){
      if(this.windowFocus) {
        pushDataIntoArray(dataIndex);
        if(dataIndex + 1 < data.length) {
          dataIndex++;
        } else {
          dataIndex = 0;
        }
      }
    }, 5000);

    this.animate(canvas);
  },
  data () {
    return {
      windowFocus: true,
      shapeArray: [],
      data: {},
    }
  },
  computed: {
    innerWidth: function() { return innerWidth; },
    innerHeight: function() { return innerHeight },
    getData: function() { return api.getData2 },
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
