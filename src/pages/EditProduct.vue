<template>
  <div class="EditProduct">
    <h2>Редактор продукта</h2>

    <template v-if="productData.characteristics">
      <input type="text" v-model="productData.title" />
      <h3>
        БЖУ
        <div></div>
      </h3>
      <ul>
        <li
          v-for="(outerItem, outerIndex) of productData.characteristics
            .foodEnergy"
          :key="`${outerItem.title}-${outerIndex}`"
        >
          <span>{{ outerItem.title }}</span>

          <input
            v-for="(item, index) of outerItem.versions"
            type="text"
            v-model="
              productData.characteristics.foodEnergy[outerIndex].versions[index]
                .value
            "
            :key="`${item.title + index}`"
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
            v-model="
              productData.characteristics.macroMicro[i].versions[0].value
            "
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
      <button @click="editData">{{ loading ? '...' : 'Save changes' }}</button>
    </template>

    <Loader v-else />
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue'
import { useMainStore } from '../stores'
import { useToast } from 'vue-toastification'
import { useRoute } from 'vue-router'
import { onMounted } from 'vue'
import router from '../router'

export default {
  name: 'edit-product',
  setup() {
    const route = useRoute()
    const toast = useToast()
    const productData = ref({
      title: '',
      characteristics: null,
      source: [{ origin: '' }],
    })
    const columns = ref(1)
    const loading = ref(false)
    const currentItem = computed(() =>
      useMainStore().productsList.find((el) => el.id === route.params.id)
    )

    const editData = () => {
      // 1. send new data to existed product to edit
      // 2. edit basic characteristics if there are new fields
      useMainStore()
        .updateProduct({
          title: productData.value.title,
          characteristics: productData.value.characteristics,
          id: currentItem.value.id,
        })
        .then(() => {
          router.push('/')
          toast.success(`Data updated: ${productData.value.title}`)
        })
        .catch((error) => {
          toast.error(error.message)
        })
    }

    const loadData = () => {
      let chars = {}
      for (let key in useMainStore().userChars) {
        chars[key] = []
        for (let item of useMainStore().userChars[key]) {
          let innerItem = {
            title: item.title,
            versions: [{ value: 0, origin: '' }],
          }
          chars[key].push(innerItem)
        }
      }
      if (currentItem.value)
        productData.value = {
          ...productData.value,
          title: currentItem.value.title,
          characteristics: currentItem.value.characteristics,
        }
    }

    watch(currentItem, (val) => {
      if (val) {
        productData.value = {
          ...productData.value,
          title: val.title,
          characteristics: val.characteristics,
        }
      }
    })

    onMounted(() => {
      // @ts-ignore
      useMainStore().isUserChecked && loadData()
    })

    return {
      toast,
      productData,
      columns,
      loading,
      currentItem,
      editData,
    }
  },
}
</script>

<style lang="scss">
.EditProduct {
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
