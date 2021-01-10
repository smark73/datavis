<template>
    <canvas id="circles"></canvas>
</template>

<script>

export default {
  name: 'Circles1',
  methods: {
    drawCircles: function(){
      for(let i = 0; i<3; i++){
        let x = Math.floor(Math.random()*this.innerWidth);
        let y = Math.floor(Math.random()*this.innerHeight);
        let dx = (Math.random() - 0.5) * 10;
        let dy = (Math.random() - 0.5) * 10;
        let r = Math.floor(Math.random()*255);
        let g = Math.floor(Math.random()*255);
        let b = Math.floor(Math.random()*255);
        this.circleArray[i] = [];
        // set the x & y as within boundary of canvas ... if circle goes over boundary, add or sub the radius
        this.circleArray[i]['x'] = x > this.radius ? (x < this.innerWidth - this.radius ? x : x - this.radius) : x + this.radius;
        this.circleArray[i]['y'] = y > this.radius ? (y < this.innerHeight - this.radius ? y : y - this.radius) : y + this.radius;
        this.circleArray[i]['dx'] = dx;
        this.circleArray[i]['dy'] = dy;
        this.circleArray[i]['r'] = r;
        this.circleArray[i]['g'] = g;
        this.circleArray[i]['b'] = b;
        // console.log(this.circleArray[i]);
      }
    },
    animate: function() {
      requestAnimationFrame(this.animate);
      this.ctx.clearRect(0,0,this.innerWidth,this.innerHeight);

      for(let i=0; i < this.circleArray.length; i++){
        let x = this.circleArray[i]['x'];
        let y = this.circleArray[i]['y'];
        let dx = this.circleArray[i]['dx'];
        let dy = this.circleArray[i]['dy'];
        let r = this.circleArray[i]['r'];
        let g = this.circleArray[i]['g'];
        let b = this.circleArray[i]['b'];

        this.ctx.beginPath();
        this.ctx.arc(x, y, this.radius, 0, Math.PI * 2, false);
        this.ctx.fillStyle = `rgba(${r},${g},${b},0.5)`;
        this.ctx.fill();
        //reverse direction at edges
        if (x + this.radius > this.innerWidth || x - this.radius < 0) {
          this.circleArray[i]['dx'] = -dx;
        }
        if (y + this.radius > this.innerHeight || y - this.radius < 0) {
          this.circleArray[i]['dy'] = -dy;
        }
        this.circleArray[i]['x'] += this.circleArray[i]['dx'];
        this.circleArray[i]['y'] += this.circleArray[i]['dy'];
      }
      
    }
  },
  mounted: function() {
    this.canvas = document.getElementById('circles');
    this.canvas.width  = this.innerWidth;
    this.canvas.height = this.innerHeight;
    this.ctx = this.canvas.getContext('2d');
    this.drawCircles();
    this.animate();
  },
  data () {
    return {
      circleArray: [],
      dx: (Math.random() - 0.5) * 10, // x velocity
      dy: (Math.random() - 0.5) * 10, // y velocity
      radius: 30,
      errors: []
    }
  },
  computed: {
    innerWidth: function() { return window.innerWidth; },
    innerHeight: function() { return window.innerHeight; },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /* canvas { border: 1px solid gray; } */
</style>
