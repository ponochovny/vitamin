<template>
  <div>
    <Menu />
    <router-view></router-view>
  </div>
</template>

<script>
import Menu from './Components/Menu/Menu'

export default {
  name: 'app',
  components: {
    'Menu': Menu
  },
  data () {
    return {
      
    }
  },
  methods: {
    closeError() {
      this.$store.dispatch('clearError')
    }
  },
  mounted() {
    this.$store.watch(
      (state)=>{
        return this.$store.getters.error // could also put a Getter here
      },
      (newValue, oldValue)=>{
        if (newValue) {
          this.$toasted.clear()
          this.$toasted.error(newValue)
        }
      },
    )
  }
}
</script>

<style lang="scss">

</style>
