<template>
  <div class="ChoosenProducts">
    <template v-if="choosenProducts.length != 0">
      <div class="ChoosenProducts__list">
        <Product
          v-for="product of choosenProducts"
          :key="product.title"
          :product="product"
        />
      </div>
      <button class="btn btn-p2 btn-secondary" @click="registerMeal">
        {{ !!alreadyRegisteredForCurrentDate ? 'Add more' : 'Register' }}
      </button>
    </template>
    <div v-else>Use list on the left to add products</div>
  </div>
</template>

<script lang="ts">
import { ref, computed, onBeforeUnmount } from 'vue'
import Product from './Product/Product.vue'
import { useToast } from 'vue-toastification'
import { useMainStore } from '../../../stores'

export default {
  name: 'choosen-products',
  props: ['classes'],
  components: {
    Product,
  },
  setup() {
    const amount = ref(0)
    const toast = useToast()

    const choosenProducts = computed(() => useMainStore().choosenProducts)
    const alreadyRegisteredForCurrentDate = computed(
      () => !!useMainStore().alreadyRegisteredForCurrentDate
    )

    const registerMeal = () => {
      if (choosenProducts.value.length == 0) return

      if (!!alreadyRegisteredForCurrentDate.value) {
        useMainStore()
          .updateRegisteredMeal()
          .then(() => {
            toast.success('Data have been updated!')
          })
          .catch((error) => toast.error(error.message))
      } else {
        useMainStore()
          .registerMeal()
          .then(() => {
            toast.success('Data have been registered!')
          })
          .catch((error) => toast.error(error.message))
      }
    }

    onBeforeUnmount(() => {
      useMainStore().clearChoosenProducts()
    })

    return {
      amount,
      toast,
      choosenProducts,
      alreadyRegisteredForCurrentDate,
      registerMeal,
    }
  },
}
</script>

<style lang="scss">
.ChoosenProducts {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__list {
    margin-bottom: 36px;
  }
}
</style>
