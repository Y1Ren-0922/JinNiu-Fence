<template>
  <NavBar
    v-if="$store.state.user.is_login && $route.path != '/map/' && $route.path != '/bicycle-map/' && $route.path != '/login/'" />
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

body {
  overflow-x: hidden;
}


/* @media screen and (-moz-min-device-pixel-ratio: 1.09) and (-moz-max-device-pixel-ratio: 1.18),
(-webkit-min-device-pixel-ratio: 1.09) and (-webkit-max-device-pixel-ratio: 1.18),
(min-resolution: 1.09dppx) and (max-resolution: 1.18dppx) {
  :root {
    font-size: 15px;
  }
}

@media screen and (-moz-min-device-pixel-ratio: 1.19) and (-moz-max-device-pixel-ratio: 1.28),
(-webkit-min-device-pixel-ratio: 1.19) and (-webkit-max-device-pixel-ratio: 1.28),
(min-resolution: 1.19dppx) and (max-resolution: 1.28dppx) {
  :root {
    font-size: 16px;
  }
}

@media screen and (-moz-min-device-pixel-ratio: 1.29) and (-moz-max-device-pixel-ratio: 1.4),
(-webkit-min-device-pixel-ratio: 1.29) and (-webkit-max-device-pixel-ratio: 1.4),
(min-resolution: 1.29dppx) and (max-resolution: 1.4dppx) {
  :root {
    font-size: 19px;
  }
}

@media screen and (-moz-min-device-pixel-ratio: 1.41) and (-moz-max-device-pixel-ratio: 1.6),
(-webkit-min-device-pixel-ratio: 1.41) and (-webkit-max-device-pixel-ratio: 1.6),
(min-resolution: 1.41dppx) and (max-resolution: 1.6dppx) {
  :root {
    font-size: 23px;
  }
}

@media screen and (-moz-min-device-pixel-ratio: 1.61) and (-moz-max-device-pixel-ratio: 1.8),
(-webkit-min-device-pixel-ratio: 1.61) and (-webkit-max-device-pixel-ratio: 1.8),
(min-resolution: 1.61dppx) and (max-resolution: 1.8dppx) {
  :root {
    font-size: 15px;
  }
}

@media screen and (-moz-min-device-pixel-ratio: 1.81) and (-moz-max-device-pixel-ratio: 2.1),
(-webkit-min-device-pixel-ratio: 1.81) and (-webkit-max-device-pixel-ratio: 2.1),
(min-resolution: 1.81dppx) and (max-resolution: 2.1dppx) {
  :root {
    font-size: 14px;
  }
} */
@media screen and (min-width: 2500px) {
  :root {
    font-size: 20px;
  }
}


@media screen and (min-width: 2000px) {
  :root {
    font-size: 15px;
  }
}
</style>
