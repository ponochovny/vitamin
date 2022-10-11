<template>
  <teleport to="body">
    <div :class="{ Preloader: true, active: isActive }">
      <img
        src="../../assets/leaf.png"
        alt=""
        :class="{ 'zoom-in': imageAnimate }"
      />
    </div>
  </teleport>
</template>

<script lang="ts">
import { ref, onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useMainStore } from '../../stores'

export default {
  setup() {
    const mainStore = useMainStore()
    const { isUserChecked } = storeToRefs(mainStore)

    const isActive = ref(true)
    const imageAnimate = ref(false)

    const closePreloader = () => {
      isActive.value = false
      imageAnimate.value = false
    }

    watch(isUserChecked, (_, oldValue) => {
      if (oldValue === false) closePreloader()
    })

    onMounted(() => {
      setTimeout(() => {
        imageAnimate.value = true
      })
    })

    return {
      isUserChecked,
      isActive,
      imageAnimate,

      closePreloader,
    }
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
