<template>
  <Preloader />
  <Header />
  <router-view v-slot="{ Component }">
    <transition mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script lang="ts">
import Header from './components/Header/Header.vue'
import Preloader from './components/Preloader/Preloader.vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

export default {
  name: 'app',
  components: {
    Header,
    Preloader,
  },
  setup() {
    const router = useRouter()
    const toast = useToast()

    router.afterEach((to, _) => {
      if (to.query.loginError) toast.error('Please log in to access this page')
    })
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
