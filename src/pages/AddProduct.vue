<template>
  <div class="AddProduct">
    <h2>Новый продукт</h2>
    <input type="text" v-model="productData.title" />
    <h3>
      БЖУ
      <div></div>
    </h3>
    <ul>
      <li
        v-for="(item, i) of productData.characteristics.foodEnergy"
        :key="item.title"
      >
        <span>{{ item.title }}</span>
        <input
          type="text"
          v-model="productData.characteristics.foodEnergy[i].versions[0].value"
        />
      </li>
    </ul>
    <h3>
      Витамины
      <div></div>
    </h3>
    <ul>
      <li
        v-for="(item, i) of productData.characteristics.vitamins"
        :key="item.title"
      >
        <span>Витамин {{ item.title }}, мг</span>
        <input
          type="text"
          v-model="productData.characteristics.vitamins[i].versions[0].value"
        />
      </li>
    </ul>
    <h3>
      Микро/Макро
      <div></div>
    </h3>
    <ul>
      <li
        v-for="(item, i) of productData.characteristics.macroMicro"
        :key="item.title"
      >
        <span>{{ item.title }}</span>
        <input
          type="text"
          v-model="productData.characteristics.macroMicro[i].versions[0].value"
        />
      </li>
    </ul>
    <br />

    <ul>
      <li>
        <span>Источник</span>
        <input
          v-for="item of columns"
          :key="item"
          type="text"
          v-model="productData.source[item - 1].origin"
        />
      </li>
    </ul>
    <br />
    <button @click="saveData">{{ isLoading ? '...' : 'Save' }}</button>
  </div>
</template>

<script lang="ts">
import { storeToRefs } from 'pinia'
import router from '../router'
import { useMainStore } from '../stores'
import {
  TDataForNewProduct,
  ECharacteristic,
  TElement,
  TCharacteristics,
} from '../types'

export default {
  name: 'add-product',
  data() {
    return {
      isLoading: false,
      productData: {
        title: '',
        characteristics: {},
        source: [{ origin: '' }],
      } as TDataForNewProduct,
      columns: 1,
    }
  },
  setup() {
    const mainStore = useMainStore()
    const { userChars: userCharsStore } = storeToRefs(mainStore)
    return { userCharsStore }
  },
  methods: {
    saveData() {
      // 1. send new data to existed product to edit
      // 2. edit basic characteristics if there are new fields
      useMainStore()
        .createProduct({
          // @ts-ignore
          ...this.productData,
        })
        .then(() => {
          router.push('/')
        })
        .catch((error) => {
          console.log('[createProduct] ERROR:', error)
        })
    },
    loadData() {
      const chars: { [key in ECharacteristic]: TElement[] } = {
        foodEnergy: [],
        macroMicro: [],
        vitamins: [],
      }
      for (const key in ECharacteristic) {
        // @ts-ignore
        for (const item of useMainStore().userChars[
          key as keyof typeof chars
        ]) {
          const innerItem: TElement = {
            title: item.title,
            versions: [{ value: 0, origin: '' }],
          }
          chars[key as keyof typeof chars].push(innerItem)
        }
      }

      // @ts-ignore
      this.productData = {
        title: '',
        characteristics: { ...chars },
        source: [{ origin: '' }],
      }
    },
  },
  mounted() {
    // @ts-ignore
    useMainStore().isUserChecked && this.loadData()
  },
  watch: {
    userCharsStore(_: any, oldValue: null | TCharacteristics) {
      // @ts-ignore
      if (oldValue === null) this.loadData()
    },
  },
}
</script>

<style lang="scss">
.AddProduct {
  padding: 60px;
  input {
    width: 205px;
    margin-bottom: 20px;
  }
  h2 {
    margin-bottom: 24px;
  }
  h3 {
    display: flex;
    align-items: center;
    margin-bottom: 32px;
    white-space: nowrap;
    div {
      display: inline-block;
      width: 100%;
      height: 2px;
      background: #bcbcbc;
      margin-left: 16px;
    }
  }
  ul {
    margin-bottom: 22px;
    li {
      margin-bottom: 16px;
      span {
        display: inline-block;
        width: 140px;
      }
      input {
        width: 60px;
        margin-bottom: 0;
      }
    }
  }
}
</style>
