<template>
  <div class="product">
    <div class="product__title" @click.self="removeItem">
      {{ product.title }}

      <div class="product__icon">
        <button class="btn">
          <svg
            width="11"
            height="10"
            viewBox="0 0 11 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="3" height="10" rx="1.5" fill="#D9D9D9" />
            <rect x="4" y="4" width="3" height="6" rx="1.5" fill="#D9D9D9" />
            <rect x="8" y="2" width="3" height="8" rx="1.5" fill="#D9D9D9" />
          </svg>
        </button>
      </div>
    </div>
    <div class="product__amount" @click="inputRefFocus">
      <input
        ref="inputRef"
        type="text"
        @change="updateChoosenProduct"
        :value="value ? value.amount : '0'"
      />
      <span>мг</span>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed } from 'vue'
import { useMainStore } from '../../../../stores'
export default {
  props: ['product'],
  name: 'app',
  setup(props: any) {
    const inputRef = ref(null)
    const amount = ref(100)
    const value = computed(() => {
      const product = useMainStore().choosenProducts.find(
        (el) => el.id === props.product.id
      )
      return product ? product : '0'
    })

    const updateChoosenProduct = (event: any) => {
      const value = event.target.value
      useMainStore().updateChoosenProduct({
        ...props.product,
        amount: value,
      })
    }
    const removeItem = () => {
      useMainStore().removeProductFromChoosen(props.product.id)
    }

    // @ts-ignore
    const inputRefFocus = () => inputRef.value.focus()

    return {
      amount,
      value,

      updateChoosenProduct,
      removeItem,

      inputRefFocus,
      inputRef,
    }
  },
}
</script>

<style lang="scss" scoped>
.product {
  display: flex;
  gap: 16px;

  height: 48px;
  margin-bottom: 8px;

  &__title {
    position: relative;

    width: 445px;
    background: #fbfbfb;
    border-radius: 4px;
    padding: 14px 24px;

    font-weight: 400;
    font-size: 16px;
    line-height: 19px;

    color: #000000;

    transition: background-color 0.35s ease;

    &:hover {
      cursor: pointer;
    }
  }

  &__icon {
    position: absolute;
    right: 16px;
    top: 14px;

    line-height: 0;

    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f3f3f3;
    border-radius: 4px;
    padding: 5px;

    .btn {
      line-height: 0;
    }
  }

  &__amount {
    display: flex;
    justify-content: space-between;

    width: 123px;
    background: #fbfbfb;
    border-radius: 4px;
    padding: 14px 24px;

    transition: background-color 0.35s ease;

    &:hover {
      cursor: pointer;
    }

    input {
      width: 52px;
      background: transparent;

      font-weight: 400;
      font-size: 16px;
      line-height: 19px;

      color: #000000;
    }

    span {
      font-weight: 400;
      font-size: 16px;
      line-height: 19px;

      color: #919191;
    }
  }

  &:hover {
    .product {
      &__title,
      &__amount {
        background-color: #f3f3f3;
      }
    }
  }
}
</style>
