<template>
  <div class="FillTheDay">
    <div class="FillTheDay__wrapper">
      <div class="FillTheDay__sidebar">Sidebar</div>
      <div class="FillTheDay__content">Fill the Day page</div>
      <div class="FillTheDay__metrics">right side</div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
.FillTheDay {
  display: flex;
  flex-direction: column;
  align-items: center;

  padding-top: 68px;

  &__wrapper {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;

    max-width: $wrapper_maxWidth;
    width: $wrapper_width;
  }
  &__sidebar {
    display: flex;
    flex-grow: 1;
    flex-basis: 0;
  }
  &__content {
    padding: 14px 0;
  }
  &__metrics {
    display: flex;
    justify-content: flex-end;
    flex-grow: 1;
    flex-basis: 0;
  }
}
</style>
