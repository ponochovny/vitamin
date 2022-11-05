<template>
  <span class="Spinner"></span>
</template>

<script>
export default {
  name: 'the-spinner',
}
</script>

<style lang="scss" scoped>
.Spinner {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: inline-block;
  border-top: 3px solid rgba($accent_color, 0.35);
  border-right: 3px solid transparent;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
