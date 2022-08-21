<template>
  <div>
    <teleport to="body">
      <Preloader />
    </teleport>
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
    Menu,
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
