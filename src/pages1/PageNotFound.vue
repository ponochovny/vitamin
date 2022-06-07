<template>
  <div class="PageNotFound">
    <div class="PageNotFound__title">404</div>
    <div class="PageNotFound__text">Page doesn't exist</div>
    <router-link to="/">Return to Main page</router-link>
  </div>
</template>

<script lang="ts">
export default {
  name: 'page-not-found',
}
</script>

<style lang="scss">
.PageNotFound {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  height: calc(100vh - 80px);

  background-image: url('../assets/design-elements/PageNotFound-bg.png');
  background-repeat: no-repeat;
  background-size: auto calc(80vh - 80px);
  background-position: center;

  &__title {
    font-size: 9rem;
    font-weight: bold;
    margin-bottom: 20px;
    color: white;
    text-shadow: 0px 5px 25px #ababab;
  }
  &__text {
    font-size: 16px;
    margin-bottom: 8px;
  }
}
</style>
