<template>
  <div id="app">
    <nav id="nav">
      <router-link to="/">Home</router-link><span> | </span>
      <router-link to="/cirlces1">Circles 1</router-link><span> | </span>
      <router-link to="/sinwave">SinWave</router-link><span> | </span>
      <router-link to="/btcvis">BtcVis</router-link><span> | </span>
      <router-link to="/squares">Squares</router-link><span> | </span>
      <router-link to="/datagen">DataGen</router-link><span> | </span>
    </nav>
    <router-view/>
  </div>
</template>

<script>
// import CircleAnim from './components/CircleAnim.vue'

export default {
  name: 'App',
  // components: {
  //   CircleAnim
  // }
}
</script>

<style>
html,
#app,
body {
  width: 100%;
  height: 100%;
}
body {
  margin:0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}
nav {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  background: rgba(255,255,255,.7);
}
nav a, nav a:hover, nav a:visited {
  color: black;
  text-decoration: none;
}
canvas {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
}
</style>
