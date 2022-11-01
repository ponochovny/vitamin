<template>
  <div class="FillTheDay">
    <div class="FillTheDay__wrapper">
      <div class="FillTheDay__sidebar">
        <products-search />
      </div>
      <div class="FillTheDay__content">
        <choosen-products />
      </div>
      <div class="FillTheDay__metrics">
        <transition>
          <chars-list v-show="isAvgCharsProdCharsExists" />
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import ProductsSearch from '../components/ProductsSearch/ProductsSearch.vue'
import ChoosenProducts from '../components/ShowUp/ChoosenProducts/ChoosenProducts.vue'
import CharsList from '../components/ShowUp/CharsList/CharsList.vue'
import { computed } from 'vue'
import { useMainStore } from '../stores'
export default {
  components: { ProductsSearch, ChoosenProducts, CharsList },
  setup() {
    const isAvgCharsProdCharsExists = computed(
      () => useMainStore().averChProdChars !== null
    )
    return {
      isAvgCharsProdCharsExists,
    }
  },
}
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

    gap: 32px;
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
    flex-grow: 0;
    flex-basis: 340px;
    flex-shrink: 1;
  }
}
</style>
