<template>
  <div class="wrap">
      <canvas id="myCanvas"></canvas>
  </div>
</template>

<script>

export default {
  name: 'SinWave',
  methods: {
    animate: function(){
      requestAnimationFrame(this.animate);
      this.c.fillStyle = 'rgba(0,0,0,.02)';
      this.c.fillRect(0,0,this.innerWidth,this.innerHeight);
      this.c.beginPath();
      this.c.moveTo(0, this.innerHeight/2);
      for(let i = 0; i<this.innerWidth; i++){
        this.c.lineTo(i, this.wave.y + Math.sin(i * this.wave.length + this.increment) * this.wave.amplitude);
      }
      this.r = Math.abs(Math.sin(this.increment*2) * 255);
      this.g = Math.abs(Math.sin(this.increment*3) * 255);
      this.b = Math.abs(Math.sin(this.increment*4) * 255);
      this.c.strokeStyle = `rgba(${this.r},${this.g},${this.b},.5)`;
      this.c.stroke();

      this.increment += this.wave.frequency;
      //move amplitude up and down
      if(this.wave.amplitude > 300) {
        this.ampIncrement = -this.ampIncrement;
      } else if (this.wave.amplitude <= 100) {
        this.ampIncrement = -this.ampIncrement;
      }
      this.wave.amplitude += this.ampIncrement;
      // move frequency up and down
      // if(this.wave.frequency >= 1) {
      //   this.freqIncrement = -this.freqIncrement;
      // } else if (this.wave.frequency <= 0) {
      //   this.freqIncrement = -this.freqIncrement;
      // }
      // this.wave.frequency += this.freqIncrement;
      // console.log(this.wave.amplitude,this.wave.frequency);
    },
    // resetWave: function() {
    //   this.canvas.addEventListener('click', function(event) {
    //     //get the pixel data from mouse position
    //     this.setAmp = event.layerX;
    //     this.setFreq = event.layerY / 10;
    //     // console.log(this.setAmp,this.setFreq);
    //   });
    // }
  },
  mounted: function() {
    //wave
    this.canvas = document.getElementById('myCanvas');
    this.canvas.width  = this.innerWidth;
    this.canvas.height = this.innerHeight;
    this.c = this.canvas.getContext('2d');
    this.wave = {
      y: this.innerHeight / 2,
      length: this.length,
      amplitude: this.amplitude,
      frequency: this.frequency,
    };
    this.ampIncrement = 1;
    this.freqIncrement = .01;
    this.increment = this.wave.frequency;
    // this.resetWave();
    this.animate();
  },
  data () {
    return {
      r: '',
      g: '',
      b: '',
      length: 0.01,
      amplitude: 200,
      frequency: .01,
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
  .wrap {
    width: 100%;
    height: 100%;
    background: #000;
  }
  canvas { }
</style>
