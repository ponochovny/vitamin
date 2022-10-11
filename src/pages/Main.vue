<template>
  <div class="Main">
    <template v-if="isUserLoggedIn">
      <ProductsSearch />
      <ChoosenProducts />
      <FilledChars />
      <History :items="registeredMeals" />
    </template>
    <template v-else>
      <h2 style="width: 100%; text-align: center; margin-top: 60px">
        Hello!<br />Please <router-link to="/auth">log in</router-link>
      </h2>
    </template>
  </div>
</template>

<script lang="ts">
import { computed } from 'vue'
import { useMainStore } from '../stores'
import FilledChars from '../components/ShowUp/FilledChars.vue'
import ProductsSearch from '../components/ProductsSearch/ProductsSearch.vue'
import ChoosenProducts from '../components/ShowUp/ChoosenProducts/ChoosenProducts.vue'
import History from '../components/ShowUp/History/History.vue'

export default {
  name: 'app',
  components: {
    FilledChars,
    ProductsSearch,
    ChoosenProducts,
    History,
  },
  setup() {
    const isUserLoggedIn = computed(() => useMainStore().isUserLoggedIn)
    const registeredMeals = computed(() => useMainStore().registeredMeals)

    return {
      isUserLoggedIn,
      registeredMeals,
    }
  },
}
</script>

<style lang="scss">
.Main {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  align-content: flex-start;
  padding: 40px 45px;
}

@media (max-width: 1440px) {
  .Main {
    .ChoosenProducts {
      max-width: 530px;
      min-width: 420px;
    }
  }
}
</style>
