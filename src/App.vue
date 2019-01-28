<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <btc msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import btc from './components/btc.vue'

export default {
  name: 'app',
  components: {
    btc
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
