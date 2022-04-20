<template>
    <div class="ChoosenProducts">
        <div class="ChoosenProducts__list">
            <Product v-for="item of choosenProducts" :key="item.title" :item="item" />
        </div>
        <button
            :disabled="choosenProducts.length == 0"
            @click="registerMeal"
        >{{ alreadyRegisteredForCurrentDate ? 'Добавить еще' : 'Зарегистрировать'}}</button>
    </div>
</template>

<script>
import Product from './Product/Product.vue'
export default {
    name: 'app',
    components: {
        'Product': Product
    },
    data () {
        return {
            amount: 0
        }
    },
    computed: {
        choosenProducts() {
            return this.$store.getters.choosenProducts
        },

        alreadyRegisteredForCurrentDate() {
            return this.$store.getters.alreadyRegisteredForCurrentDate
        },
    },
    methods: {
        registerMeal() {
            if (this.choosenProducts.length == 0) return

            if (this.alreadyRegisteredForCurrentDate) {

                // ...
                const dateObjNow = new Date()

                const monthNow = dateObjNow.getUTCMonth() + 1
                const dayNow = dateObjNow.getUTCDate()
                const yearNow = dateObjNow.getUTCFullYear()

                const foundElement = this.$store.state.products.registeredMeals.find(el => {
                    const thisDate = new Date(el.date)
                    
                    const month = thisDate.getUTCMonth() + 1
                    const day = thisDate.getUTCDate()
                    const year = thisDate.getUTCFullYear()
                    
                    return (month === monthNow && day === dayNow && year === yearNow)
                })
                // ...

                this.$store.dispatch('updateRegisteredMeal', {
                    id: foundElement.id,
                    productList: foundElement.productsList
                })
                    .then(() => {
                        // this.$toasted.success('Data had been updated!')
                        this.$store.dispatch('clearChoosenProducts')
                    })
                    .catch((error) => {
                        // this.$toasted.error(error)
                    })

            } else {
                this.$store.dispatch('registerMeal')
                    .then(() => {
                        // this.$toasted.success('Data had been registered!')
                        this.$store.dispatch('clearChoosenProducts')
                    })
                    .catch((error) => {
                        // this.$toasted.error(error)
                    })
            }
        }
    },
    mounted() {

    },
    beforeDestroy() {
        this.$store.dispatch('clearChoosenProducts')
    }
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
                font-size: 36px;
                line-height: 42px;

                color: #696969;

                padding: 12px 15px;
                background-color: #F2F2F2;
                border-radius: 5px;
                margin-bottom: 8px;
                text-align: center;

                transition: background-color .35s ease;

                &:hover {
                    background-color: #dbdbdb;
                    cursor: pointer;
                }
            }
            input {
                width: 100%;
                height: 41px;

                background: #F2F2F2;
                border: 1px solid #B5B5B5;
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
</style>
