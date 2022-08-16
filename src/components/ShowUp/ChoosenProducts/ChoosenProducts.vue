<template>
  <div class="ChoosenProducts">
    <div class="ChoosenProducts__list">
      <Product v-for="item of choosenProducts" :key="item.title" :item="item" />
    </div>
    <button :disabled="choosenProducts.length == 0" @click="registerMeal">
      {{
        !!alreadyRegisteredForCurrentDate ? 'Добавить еще' : 'Зарегистрировать'
      }}
    </button>
  </div>
</template>

<script lang="ts">
import { ref, computed } from 'vue'
import Product from './Product/Product.vue'
import { useToast } from 'vue-toastification'
import { useMainStore } from '../../../stores'

export default {
  name: 'app',
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
            toast.success('Data had been updated!')
          })
          .catch((error) => toast.error(error.message))
      } else {
        useMainStore()
          .registerMeal()
          .then(() => {
            toast.success('Data had been registered!')
          })
          .catch((error) => toast.error(error.message))
      }
    }

    return {
      amount,
      toast,
      choosenProducts,
      alreadyRegisteredForCurrentDate,
      registerMeal,
    }
  },
  beforeDestroy() {
    useMainStore().clearChoosenProducts()
  },
}
</script>

<style lang="scss">
.ChoosenProducts {
  width: 550px;
  text-align: center;
  &__list {
    margin-bottom: 31px;
  }
  button {
    width: 320px;
  }
  .item {
    display: inline-block;
    margin-right: 24px;
    width: 263px;
    &:nth-child(even) {
      margin-right: 0;
    }
    &__title {
      font-family: Roboto;
      font-style: normal;
      font-weight: normal;
      font-size: 24px;
      line-height: 28px;

      color: #696969;

      padding: 12px 15px;
      background-color: #f2f2f2;
      border-radius: 5px;
      margin-bottom: 8px;
      text-align: center;

      transition: background-color 0.35s ease;

      &:hover {
        background-color: #dbdbdb;
        cursor: pointer;
      }
    }
    input {
      width: 100%;
      height: 41px;

      background: #f2f2f2;
      border: 1px solid #b5b5b5;
      box-sizing: border-box;
      border-radius: 5px;
      text-align: center;

      font-family: Roboto;
      font-style: normal;
      font-weight: normal;
      font-size: 24px;
      line-height: 28px;

      color: #696969;
    }
  }
}

@media (max-width: 1440px) {
  .ChoosenProducts {
    &__list {
      margin-bottom: 16px;
    }
    button {
      width: auto;
      padding-left: 30px;
      padding-right: 30px;
    }
  }
}
</style>
