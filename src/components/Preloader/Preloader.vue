<template>
  <div :class="{ Preloader: true, active: isActive }">
    <img
      src="../../assets/leaf.png"
      alt=""
      :class="{ 'zoom-in': imageAnimate }"
    />
  </div>
</template>
<script>
// import img from '../../assets/leaf.png'

import { storeToRefs } from 'pinia'
import { useMainStore } from '../../stores'

export default {
  setup() {
    const mainStore = useMainStore()
    const { isUserChecked } = storeToRefs(mainStore)

    return { isUserChecked }
  },
  data() {
    return {
      // preloadLogo: img,
      isActive: true,
      imageAnimate: false,
    }
  },
  methods: {
    closePreloader() {
      this.isActive = false
      this.imageAnimate = false
    },
  },
  mounted() {
    setTimeout(() => {
      this.imageAnimate = true
    })
  },
  watch: {
    isUserChecked(_, oldValue) {
      if (oldValue === false) this.closePreloader()
    },
  },
}
</script>

<style lang="scss">
.Preloader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;

  z-index: 1;
  opacity: 0;
  pointer-events: none;

  transition: opacity 0.5s ease;

  img {
    width: 100px;
    transform: scale(0.7);

    transition: transform 0.5s ease;

    &.zoom-in {
      transform: scale(1);
    }
  }

  &.active {
    opacity: 1;
    pointer-events: all;
  }
}
</style>
