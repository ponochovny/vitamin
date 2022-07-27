<template>
  <div>
    <Preloader />
    <Menu />
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Menu from './components/Menu/Menu.vue'
import Preloader from './components/Preloader/Preloader.vue'

export default {
  name: 'app',
  components: {
    Menu: Menu,
    Preloader,
  },
}
</script>

<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
