<template>
    <div class="ProductsSearch">
        <h2 class="ProductsSearch__title">
            Продукты
        </h2>
        <div class="separator" />
        <input type="text" v-model="search">
        <div class="separator" />
        <p v-if="loading" style="text-align: center; font-size: 24px; margin-bottom: 15px">
            <Loader />
        </p>
        <ul class="ProductsSearch__list" v-if="filteredProducts.length > 0">
            <li v-for="item of filteredProducts" :key="item.title" @click="addProductToChoosen(item)">
                <span>
                    {{item.title}}
                </span>
                <span class="ProductsSearch__icon" @click.stop="testClick(item.id)">
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.84007 1.85367L9.07772 4.09129L3.41361 9.7554L1.17723 7.51777L6.84007 1.85367ZM10.7757 1.314L9.77776 0.316097C9.3921 -0.0695585 8.76587 -0.0695585 8.37891 0.316097L7.42301 1.27199L9.66066 3.50964L10.7757 2.39464C11.0748 2.09551 11.0748 1.61312 10.7757 1.314ZM0.00622685 10.6629C-0.0344955 10.8462 0.130973 11.0104 0.314265 10.9659L2.80775 10.3613L0.571369 8.12366L0.00622685 10.6629Z" fill="black"/>
                    </svg>
                </span>
            </li>
        </ul>
        <button @click="$router.push('/new-product')">Добавить</button>
    </div>
</template>

<script>

export default {
  name: 'ProductsSearch',
  data () {
    return {
      search: '',
    }
  },
  computed: {
    loading() {
      return this.$store.getters.loading
    },
    filteredProducts() {
      return this.$store.getters.products.filter(el => el.title.toLowerCase().includes(this.search.toLowerCase()))
    }
  },
  methods: {
    testClick(id) {
      this.$router.push(`/edit-product/${id}`)
    },
    addProductToChoosen: function(item) {
      if (this.$store.getters.choosenProducts.find(el => el.id === item.id)) return
      this.$store.dispatch('addProductToChoosen', {
        ...item
      })
    }
  },
  mounted() {
    // const rangeStart = 0
    // const rangeEnd = 2
    
    // var iterate = function* (start = 0, end = 5, step = 1) {
    //     for (let i = start; i <= end; i += step) {
    //         yield i;
    //     }
    // }
    
    // var values =    (rangeStart, rangeEnd);
    // var tmp = [];
    
    // for (let item = 0; item < rangeEnd; item++) {
    //     console.log('...', item)
    //     console.log('... values.next', values.next)

    //     if (values.next) {
    //         console.log('...', values.next())
    //         debugger
    //         if (values.next().done) break
        
    //         tmp.push(values.next().value)
    //     }
    // }
    
    // console.log(tmp.join(","))
  }
}
</script>

<style lang="scss">
    .ProductsSearch {
        max-width: 383px;
        min-width: 290px;
        &__title {
            margin-bottom: 21px;
        }
        button {
            width: 100%;
            max-width: 263px;
        }
        input {
            width: 263px;
            height: 41px;
            margin: 27px 0;
            padding: 0 7px;
            background-color: #F2F2F2;
            border: 1px solid #B5B5B5;
            border-radius: 5px;

            font-family: Roboto;
            font-style: normal;
            font-weight: normal;
            font-size: 18px;
            line-height: 21px;

            color: #606060;

            transition: color .35s ease;
            
            &:focus {
                color: #000;
            }
        }
        .separator {
            width: 100%;
            height: 2px;
            background-color: #BCBCBC;
        }
        &__list {
            margin: 16px 0;
            li {
                display: flex;
                justify-content: space-between;
                align-items: center;

                font-family: Roboto;
                font-style: normal;
                font-weight: normal;
                font-size: 18px;
                line-height: 21px;

                color: #000000;

                padding: 10px 16px;
                margin-bottom: 7px;
                border-radius: 5px;
                width: 263px;

                transition: color 35s ease, background-color .15s ease;
                &:hover {
                    background-color: #F2F2F2;
                    color: #696969;
                    transition: color 35s ease, background-color .05s ease;
                    cursor: pointer;
                }

                .ProductsSearch {
                    &__icon {
                        display: inline-flex;
                        align-items: center;

                        padding: 5px 10px;
                        border-radius: 5px;
                        background-color: transparent;

                        transition: background-color .35s ease;
                        &:hover {
                            background-color: #dbdbdb;
                        }
                    }
                }
            }
        }
    }

    @media (max-width: 1440px) {
      .ProductsSearch {
        &__title {
          // font-size: 36px;
          // line-height: 44px;
        }
      }
    }
</style>
