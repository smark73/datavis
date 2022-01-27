<template>
  <div class="wrap">
    <div class="left">
      <button @click="getPrice()">Get {{ this.ticker }} Prices</button>
      <div v-if="priceData">
        <h3>{{ priceData.symbol }}</h3>
        <p>price: {{ priceData.price }}</p>
        <p>change: {{ priceData.change }}</p>
        <p>dayLow: {{ priceData.dayLow }}</p>
        <p>dayHigh: {{ priceData.dayHigh }}</p>
        <p>priceAvg50: {{ priceData.priceAvg50 }}</p>
        <p>priceAvg200: {{ priceData.priceAvg200 }}</p>
        <p>volume: {{ priceData.volume }}</p>
        <p>avgVolume: {{ priceData.avgVolume }}</p>
        <p>open: {{ priceData.open }}</p>
        <p>previousClose: {{ priceData.previousClose }}</p>
      </div>
    </div>
    <canvas id="myCanvas" ></canvas>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'BtcVis',
  methods: {
    // [ {
    //   "symbol" : "BTCUSD",
    //   "name" : "Bitcoin USD",
    //   "price" : 26602.13000000,
    //   "changesPercentage" : 0.04000000,
    //   "change" : 11.12000000,
    //   "dayLow" : 26495.51400000,
    //   "dayHigh" : 26878.56200000,
    //   "yearHigh" : 26878.56200000,
    //   "yearLow" : 4106.98100000,
    //   "marketCap" : 494322286592.00000000,
    //   "priceAvg50" : 19115.40800000,
    //   "priceAvg200" : 12930.41200000,
    //   "volume" : 50676318208,
    //   "avgVolume" : 32412157536,
    //   "exchange" : "CRYPTO",
    //   "open" : 26591.01000000,
    //   "previousClose" : 26591.01000000,
    //   "eps" : null,
    //   "pe" : null,
    //   "earningsAnnouncement" : null,
    //   "sharesOutstanding" : 18582057,
    //   "timestamp" : 1609038892
    // } ]
    getPrice () {
      // console.log(this.innerWidth, this.innerHeight);
      let ticker = this.ticker;
      axios.get(`https://financialmodelingprep.com/api/v3/quote/${ticker}?apikey=ea3335aab1fd5c63804651a91b837d7d`)
        .then(response => {
          // JSON responses are automatically parsed.
          this.priceData = response.data[0]
          // console.log(response.data);
          // console.log(this.priceData);
          // console.log(this.priceData.symbol);
          this.drawPrice();
        })
        .catch(e => {
          this.errors.push(e)
          console.log(e);
        })
    },
    drawPrice () {
      
      requestAnimationFrame(this.drawPrice);
      let yearHigh = this.priceData.yearHigh;
      let yearLow = this.priceData.yearLow;

      // let dayHigh = this.priceData.dayHigh;
      // let dayLow = this.priceData.dayLow;
      // let price = this.priceData.price;

      this.c.fillStyle = ('rgba(0,255,0,1');
      this.c.fillRect(20, 0, 40, (yearHigh/1000));

      this.c.moveTo(100, 0);

      this.c.fillStyle = ('rgba(255,0,0,1');
      this.c.fillRect(50, 0, 70, (yearLow/1000));

    },
  },
  mounted: function() {
      this.canvas = document.getElementById('myCanvas');
      this.canvas.width = this.innerWidth;
      this.canvas.height = this.innerHeight;
      this.c = this.canvas.getContext('2d');

      this.c.fillStyle = ('rgba(0,255,0,1');
      this.c.fillRect(50, 250, 10, 10);
  },
  data () {
    return {
      priceData: [],
      ticker: 'BTCUSD',
      errors: []
    }
  },
  computed: {
    innerWidth: function() { return innerWidth; },
    innerHeight: function() { return innerHeight; },
  }
}
</script>

<style scoped>
  h1 { color: gray; }
  .wrap { 
    width: 100%;
    height: 100%;
    z-index: 0;
    position: relative;
  }
  .left {
    width: 200px;
    font-size: .8em;
    position: absolute;
    left:0;
    top:50px;
    z-index: 10;
  }
  canvas {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
  }
  
</style>
