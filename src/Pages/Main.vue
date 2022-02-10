<template>
    <div class="Main">
        <template v-if="isUserLoggedIn">
          <ProductsSearch />
          <div :style="{marginTop: '56px'}">
              <h2 :style="{marginBottom: '35px'}">Выбранные продукты</h2>
              <ChoosenProducts />
          </div>
          <div :style="{marginTop: '56px'}">
              <h2 :style="{marginBottom: '35px'}">От дневной нормы</h2>
              <FilledChars :averageProductsCharacteristics="averageChoosenProductsChars" />
          </div>
          <History :items="registeredMeals" />
        </template>
        <template v-else>
          <h2 style="width: 100%; text-align: center; margin-top: 60px">You're not logged in. <router-link to="/auth">Log in</router-link></h2>
        </template>
    </div>
</template>

<script>
import FilledChars from '../ShowUp/FilledChars'
import ProductsSearch from '../ProductsSearch/ProductsSearch'
import ChoosenProducts from '../ShowUp/ChoosenProducts/ChoosenProducts'
import History from '../ShowUp/History/History'

export default {
  name: 'app',
  components: {
    'FilledChars': FilledChars,
    'ProductsSearch': ProductsSearch,
    'ChoosenProducts': ChoosenProducts,
    'History': History,
  },
  data () {
    return {
      isLoggedIn: true
    }
  },
  computed: {
    averageChoosenProductsChars() {
      return this.$store.getters.averageChoosenProductsChars
    },
    isUserLoggedIn() {
      return this.$store.getters.isUserLoggedIn
    },
    registeredMeals() {
      return this.$store.getters.registeredMeals
    }
  }
}
</script>

<style lang="scss">
    .Main {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: flex-start;
        align-content: flex-start;
        padding: 0 45px;
        .ProductsSearch {
            margin-top: 56px;
            margin-right: 96px;
        }
        .ChoosenProducts {
            margin-right: 96px;
        }
    }
</style>
