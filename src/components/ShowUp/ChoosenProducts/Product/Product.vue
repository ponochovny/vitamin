<template>
  <div class="item">
    <div class="item__title" @click="removeItem">{{ item.title }}, г</div>
    <input
      type="text"
      @change="updateChoosenProduct"
      :value="value ? value.amount : '0'"
    />
  </div>
</template>

<script lang="ts">
import { ref, computed } from 'vue'
import { useMainStore } from '../../../../stores'
export default {
  props: ['item'],
  name: 'app',
  setup(props) {
    const amount = ref(100)
    const value = computed(() => {
      let item = useMainStore().choosenProducts.find(
        (el) => el.id === props.item.id
      )
      return item ? item : '0'
    })

    const updateChoosenProduct = (event: any) => {
      const value = event.target.value
      useMainStore().updateChoosenProduct({
        ...props.item,
        amount: value,
      })
    }
    const removeItem = () => {
      useMainStore().removeProductFromChoosen(props.item.id)
    }

    return {
      amount,
      value,

      updateChoosenProduct,
      removeItem,
    }
  },
}
</script>

<style lang="scss" scoped>
.item {
  display: inline-block;
  margin-right: 24px;
  margin-bottom: 16px;
  width: 263px;

  &:last-child {
    margin-right: 0;
  }

  &__title {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: normal;

    color: #696969;

    padding: 12px 15px;
    background: #f2f2f2;
    border-radius: 5px;
    margin-bottom: 8px;
    text-align: center;
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

@media (max-width: 1440px) {
  .item {
    margin-right: 16px;
    width: 100%;
    max-width: 250px;
    &__title {
      font-size: 16px;
    }

    input {
      height: 32px;
      font-size: 16px;
    }
  }
}
</style>
