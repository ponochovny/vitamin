<template>
    <div class="EditProduct">
        <h2>Редактор продукта</h2>
        <input type="text" v-model="productData.title">
        <h3>БЖУ <div></div></h3>
        <ul>
          <li v-for="(outerItem, outerIndex) of productData.characteristics.foodEnergy" :key="`${outerItem.title}-${outerIndex}`">
            <span>{{ outerItem.title }}</span>

            <template v-for="(item, index) of outerItem.versions">
              <!-- :model="productData.characteristics.foodEnergy[outerIndex].versions[index].value" -->
              <input
                type="text"
                v-model="productData.characteristics.foodEnergy[outerIndex].versions[index].value"
                :key="`${item.title + index}`"
              >
            </template>

          </li>
        </ul>
        <h3>Витамины <div></div></h3>
        <ul>
          <li v-for="(item, i) of productData.characteristics.vitamins" :key="item.title">
            <span>Витамин {{ item.title }}, мг</span>
            <input type="text" v-model="productData.characteristics.vitamins[i].versions[0].value">
          </li>
        </ul>
        <h3>Микро/Макро <div></div></h3>
        <ul>
          <li v-for="(item, i) of productData.characteristics.macroMicro" :key="item.title">
            <span>{{ item.title }}</span>
            <input type="text" v-model="productData.characteristics.macroMicro[i].versions[0].value">
          </li>
        </ul>
        <br>
        
        <ul>
          <li>
            <span>Источник</span>
            <input v-for="item of columns" :key="item" type="text" v-model="productData.source[item-1].origin">
          </li>
        </ul>

        <!-- <p>Источник</p>
        <input v-for="item of columns" :key="item" type="text" v-model="productData.source[item-1].origin"> -->
        <br>
        <button @click="editData">{{ loading ? '...' : 'Save changes'}}</button>
    </div>
</template>

<script>
export default {
  name: 'edit-product',
  components: {
      
  },
  data () {
    return {
        productData: {
          title: '',
          characteristics: {},
          source: [
            {origin: ''}
          ]
        },
        columns: 1
    }
  },
  computed: {
    loading() {
      return this.$store.getters.loading
    },
    currentItem() {
      return this.$store.getters.products.find(el => el.id === this.$route.params.id)
    }
  },
  watch: {
    currentItem(val, val2) {
      if (val) {
        this.productData = {
          ...this.productData,
          title: val.title,
          characteristics: val.characteristics
        }
      }
    }
  },
  methods: {
    editData() {
      // 1. send new data to existed product to edit
      // 2. edit basic characteristics if there are new fields
      this.$store.dispatch('updateProduct', {
        title: this.productData.title,
        id: this.currentItem.id
      })
        .then(() => {
          this.$router.push('/')

          this.$toasted.success(`Data updated: ${this.productData.title}`)
        })
        .catch((error) => {
          this.$toasted.error(error)
        })
    }
  },
  mounted() {
    let chars = {}
    for (let key in this.$store.getters.basicCharacteristics) {
      chars[key] = []
      for (let item of this.$store.getters.basicCharacteristics[key]) {
        let innerItem = {
          title: item.title,
          versions: [
            {value: 0, origin: ''}
          ]
        }
        chars[key].push(innerItem)
      }
    }

    if (this.currentItem) this.productData = {
      ...this.productData,
      title: this.currentItem.title,
      characteristics: this.currentItem.characteristics
    }
  }
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
            background: #BCBCBC;
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
