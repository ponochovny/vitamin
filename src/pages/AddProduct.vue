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
        v-for="(item, i) of productData.characteristics.minerals"
        :key="item.title"
      >
        <span>{{ item.title }}</span>
        <input
          type="text"
          v-model="productData.characteristics.minerals[i].versions[0].value"
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
    <button class="btn" @click="saveData">
      {{ isLoading ? '...' : 'Save' }}
    </button>
  </div>
</template>

<script lang="ts">
import { ref, watch, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useToast } from 'vue-toastification'
import router from '../router'
import { useMainStore } from '../stores'
import {
  TDataForNewProduct,
  ECharacteristic,
  TElement,
  TCharacteristics,
} from '../types'
import { useUserStore } from '../stores/modules/user'

export default {
  name: 'add-product',
  setup() {
    const mainStore = useMainStore()
    const { userChars: userCharsStore } = storeToRefs(mainStore)
    const toast = useToast()
    const isLoading = ref(false)
    const productData = ref({
      title: '',
      characteristics: {},
      source: [{ origin: '' }],
    } as TDataForNewProduct)
    const columns = ref(1)

    const saveData = () => {
      // 1. send new data to existed product to edit
      // 2. edit basic characteristics if there are new fields
      useMainStore()
        .createProduct({
          // @ts-ignore
          ...productData.value,
        })
        .then(function () {
          router.push('/')
          // @ts-ignore
          toast.success(
            // @ts-ignore
            `Product ${productData.value.title} has been added!}`
          )
        })
        .catch(function (error) {
          console.log('[createProduct] ERROR:', error)
        })
    }

    const loadData = () => {
      const chars: { [key in ECharacteristic]: TElement[] } = {
        foodEnergy: [],
        minerals: [],
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
      productData.value = {
        title: '',
        characteristics: { ...chars },
        source: [{ origin: '' }],
      }
    }

    watch(userCharsStore, function (_: any, oldValue: null | TCharacteristics) {
      // @ts-ignore
      if (oldValue === null) loadData()
    })

    // @ts-ignore
    onMounted(() => useUserStore().isUserChecked && loadData())

    return {
      userCharsStore,
      toast,
      isLoading,
      productData,
      columns,

      saveData,
      loadData,
    }
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
