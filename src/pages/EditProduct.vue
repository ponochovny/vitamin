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
import { useMainStore } from '../stores'
import { useToast } from 'vue-toastification'

export default {
  name: 'edit-product',
  setup() {
    const toast = useToast()

    return { toast }
  },
  data() {
    return {
      productData: {
        title: '',
        characteristics: null,
        source: [{ origin: '' }],
      },
      columns: 1,
      loading: false,
    }
  },
  computed: {
    currentItem() {
      return useMainStore().productsList.find(
        (el) => el.id === this.$route.params.id
      )
    },
  },
  watch: {
    currentItem(val, val2) {
      if (val) {
        this.productData = {
          ...this.productData,
          title: val.title,
          characteristics: val.characteristics,
        }
      }
    },
  },
  methods: {
    editData() {
      // 1. send new data to existed product to edit
      // 2. edit basic characteristics if there are new fields
      useMainStore()
        .updateProduct({
          title: this.productData.title,
          characteristics: this.productData.characteristics,
          id: this.currentItem.id,
        })
        .then(() => {
          this.$router.push('/')
          this.toast.success(`Data updated: ${this.productData.title}`)
        })
        .catch((error) => {
          this.toast.error(error.message)
        })
    },

    tempHandler(value) {
      console.log('... value', value.target.value)
    },

    loadData() {
      let chars = {}
      for (let key in useMainStore().userChars) {
        // console.log('... key', key)
        chars[key] = []
        for (let item of useMainStore().userChars[key]) {
          let innerItem = {
            title: item.title,
            versions: [{ value: 0, origin: '' }],
          }
          chars[key].push(innerItem)
        }
      }
      if (this.currentItem)
        this.productData = {
          ...this.productData,
          title: this.currentItem.title,
          characteristics: this.currentItem.characteristics,
        }
    },
  },
  mounted() {
    // @ts-ignore
    useMainStore().isUserChecked && this.loadData()
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
