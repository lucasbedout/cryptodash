<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
};
</script>

<style lang="scss">
  @import "./assets/scss/_variables";
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  #app {
    color: #525f7f;
    font-family: 'Source Sans Pro', 'Avenir', serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    height:100vh;
    padding-top: 60px;
    background-color: $background;
  }
</style>
