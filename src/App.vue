<!-- 
  Acts as root component, renders router-view for navigation and renders any 
  universal components such as the top bar.
-->

<template>
  <div id="app">
    <topbar />
    <router-view />
  </div>
</template>

<script>
import Topbar from './components/topbar.vue';
export default {
  name: 'App',
  components: {
    Topbar,
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  padding: 0;
  margin: 0;
  font-size: 20px;
}

#app {
  font-family: 'Open Sans', Helvetica, Arial, Lucida, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
