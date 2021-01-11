<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link><span> | </span>
      <router-link to="/cirlces1">Circles 1</router-link><span> | </span>
      <router-link to="/sinwave">Sin Wave</router-link><span> | </span>
    </div>
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
</style>
