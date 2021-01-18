<template>
  <div>
    <p>See console for data </p>
  </div>
</template>

<script>
export default {
  name: 'DataGen',
  methods: {
    Data (price, prevPrice, priceChange, dayHigh, dayLow, yearHigh, yearLow) {
      this.price = price;
      this.prevPrice = prevPrice;
      this.priceChange = priceChange;
      this.dayHigh = dayHigh;
      this.dayLow = dayLow;
      this.yearHigh = yearHigh;
      this.yearLow = yearLow;
    }
  },
  mounted: function() {
    let prevPrice = 100;
    for(let i = 0; i<50; i++) {
      let priceChange = Math.sin(Math.random()*10) * 10;
      let price = prevPrice + priceChange;
      let dayHigh = 150;
      let dayLow = 50;
      let yearHigh = 200;
      let yearLow = 30;
      this.dataArray.push(new this.Data(price, prevPrice, priceChange, dayHigh, dayLow, yearHigh, yearLow));
      prevPrice = price;
    }
    console.log(JSON.stringify(this.dataArray, null, 2));

  },
  data () {
    return {
      dataArray: [],
      // price : '',
      // dayLow : '',
      // dayHigh : '',
      // yearHigh : '',
      // yearLow : '',
      // priceAvg50 : '',
      // priceAvg200 : '',
      // volume : '',
      // avgVolume : '',
      // open : '',
      // previousClose : '',
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1 { color: gray; }
</style>
