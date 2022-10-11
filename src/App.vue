<template>
  <Preloader />
  <Header />
  <router-view></router-view>
</template>

<script lang="ts">
import Header from './components/Header/Header.vue'
import Preloader from './components/Preloader/Preloader.vue'

export default {
  name: 'app',
  components: {
    Header,
    Preloader,
  },
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
