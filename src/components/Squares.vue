<template>
    <canvas id="myCanvas" ></canvas>
</template>

<script>
import * as api from './api'
export default {
  name: 'Squares',
  methods: {
    getData () {
      return api.getData()
    },
    animate () {
      requestAnimationFrame(this.animate);
      let bg = this.c.createLinearGradient(0, 0, 0, this.canvas.height);
      bg.addColorStop(0, 'rgba(1,73,77,1)');
      bg.addColorStop(.5, 'rgba(0,46,48,1)');
      bg.addColorStop(1, 'rgba(1,73,77,1)');
      this.c.fillStyle = bg;
      this.c.fillRect(0,0,this.canvas.width,this.canvas.height);
      for(let i = 0; i<this.boxArray.length; i++){
        this.boxArray.forEach(box => {
          box.update();
        })
      }
    },
    Box(x, y, yInit, w, h, color1, color2, canvas) {
      this.x = x;
      this.y = y;
      this.yInit = yInit;
      this.w = w;
      this.h = h;
      this.color1 = color1;
      this.color2 = color2;
      this.canvas = canvas;

      let startGrow = 800;
      this.draw = function() {
        if(this.x < startGrow) {
          if (this.yInit <= this.y) {
            this.yInit += 1;
            this.h += 2;
          }
        } else {
          this.h = 20;
        }

        this.canvas.moveTo(this.x, this.yInit+10);
        let boxFill = this.canvas.createLinearGradient(0, this.yInit, 0, this.h);
        boxFill.addColorStop(0, color2);
        boxFill.addColorStop(.5, color1);
        boxFill.addColorStop(1, color2);

        // this.canvas.moveTo(this.x, this.yInit);
        this.canvas.fillStyle = boxFill;
        this.canvas.fillRect(this.x, this.yInit, this.w, this.h);
      }
      this.update = function() {
        this.draw();
        this.x -= .02;
      }
    }
  },
  mounted: function() {
    this.canvas = document.getElementById('myCanvas');
    this.canvas.width = this.innerWidth;
    this.canvas.height = this.innerHeight;
    this.c = this.canvas.getContext('2d');

    this.data = this.getData();
    // console.log(this.data);

    for(let i = 0; i < this.data.length; i++){
      let boxStart = i * this.boxWidth + this.innerWidth;
      let price = this.data[i].price;
      let prevPrice = this.data[i].prevPrice;
      // console.log(boxStart,price);
      // let priceChange = this.data.priceChange;
      // let dayHigh = this.data.dayHigh;
      // let dayLow = this.data.dayLow;
      // let yearHigh = this.data.yearHigh;
      // let yearLow = this.data.yearLow;
      let color1, color2;
      if(price > prevPrice) {
        color1 = 'rgba(0,255,0,.02)';
        color2 = 'rgba(0,255,0,.01)';
      } else {
        color1 = 'rgba(255,0,0,.02)';
        color2 = 'rgba(255,0,0,.01)';
      }
      this.boxArray.push(new this.Box(
        boxStart, 
        this.innerHeight/2 - price/2, 
        this.innerHeight/2,
        this.boxWidth, 
        price, 
        color1, 
        color2, 
        this.c
      ));
    }
    this.animate();
  },
  data () {
    return {
      boxArray: [],
      data: {},
      boxWidth: 40,
    }
  },
  computed: {
    innerWidth: function() { return innerWidth; },
    innerHeight: function() { return innerHeight }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
