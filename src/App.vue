<template>
  <NavBar v-if="$store.state.user.is_login && $route.path != '/map/' && $route.path != '/bicycle-map/'" />
  <router-view />
</template>


<script>
import NavBar from './components/NavBar.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap"

export default {
  components: {
    NavBar,
  },

}

</script>

<style>
#app {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  /* background: linear-gradient(90deg, #000 0, #013 35%, #013 65%, #000);
  z-index: 20;
  position: absolute; */
}
</style>
