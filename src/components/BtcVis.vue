<template>
  <div class="wrap">
    <canvas v-if="priceData"
      id="myCanvas" 
      width="600" 
      height="200" 
      style="border:1px solid #ccc;"
    ></canvas>
    <button @click="getPrice(ticker)">Get {{ticker}} Prices</button>
    <div v-if="priceData">
      <h3>{{priceData.symbol}}</h3>
      <p>price: {{priceData.price}}</p>
      <p>change: {{priceData.change}}</p>
      <p>dayLow: {{priceData.dayLow}}</p>
      <p>dayHigh: {{priceData.dayHigh}}</p>
      <p>priceAvg50: {{priceData.priceAvg50}}</p>
      <p>priceAvg200: {{priceData.priceAvg200}}</p>
      <p>volume: {{priceData.volume}}</p>
      <p>avgVolume: {{priceData.avgVolume}}</p>
      <p>open: {{priceData.open}}</p>
      <p>previousClose: {{priceData.previousClose}}</p>
    </div>
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
    getPrice (ticker) {
      axios.get(`https://financialmodelingprep.com/api/v3/quote/${ticker}?apikey=ea3335aab1fd5c63804651a91b837d7d`)
        .then(response => {
          // JSON responses are automatically parsed.
          this.priceData = response.data[0]
          // console.log(response.data);
          // console.log(this.priceData);
          // console.log(this.priceData.symbol);
        })
        .catch(e => {
          this.errors.push(e)
          // console.log(e);
        })
    },
    drawPrice (priceData) {
      let yearHigh = priceData.yearHigh;
      let yearLow = priceData.yearLow;
      let dayHigh = priceData.dayHigh;
      let dayLow = priceData.dayLow;
      let price = priceData.price;

      let top = 0;
      let bottom = 200;

      var c = document.getElementById('myCanvas');
      //create our context element inside the canvas
      var ctx = c.getContext('2d');
      // ctx.fillStyle = 'rgb(50,50,50)';
      width = 600;
      height = 200;
      // for (x = 0; x < width; x += 50) {
        ctx.fillRect(0,0,,200);

        var paintIt = ctx.createImageData();
        // console.log(r,g,b,a);
        paintIt.data[0] = r < 255 ? r + 20 : 255 - r;
        paintIt.data[1] = g < 255 ? g + 25 : 255 - g;
        paintIt.data[2] = b < 255 ? b + 30 : 255 - b;
        paintIt.data[3] = a;
        ctx.putImageData(paintIt, x, y);

      // }
    },
  },
  data () {
    return {
      priceData: [],
      ticker: 'BTCUSD',
      errors: []
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 { color: gray; }
.wrap { width: 100%; min-height: 400px; border: 1px solid gray; }
</style>
