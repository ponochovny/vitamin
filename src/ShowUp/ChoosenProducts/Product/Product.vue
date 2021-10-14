<template>
    <div class="item">
        <div class="item__title" @click="removeItem">{{ item.title }}, г</div>
        <input type="text" @change="updateChoosenProduct" :value="value ? value.amount : '0'">
    </div>
</template>

<script>
export default {
    props: ['item'],
    name: 'app',
    components: {
        
    },
    data () {
        return {
            amount: 100
        }
    },
    computed: {
        value() {
            let item = this.$store.getters.choosenProducts.find(el => el.id === this.item.id)
            return item ? item : '0'
        }
    },
    methods: {
        updateChoosenProduct(event) {
            let value = event.target.value
            this.$store.dispatch('updateChoosenProduct', {...this.item, amount: value})
        },
        removeItem() {
            this.$store.dispatch('removeProductFromChoosen', this.item.id)
        }
    },
    mounted() {
    }
}
</script>

<style lang="scss" scoped>
    .item {
        display: inline-block;
        margin-right: 24px;
        margin-bottom: 16px;
        width: 263px;
        &__title {
            font-family: Roboto;
            font-style: normal;
            font-weight: 500;
            font-size: 24px;
            line-height: normal;

            color: #696969;

            padding: 12px 15px;
            background: #F2F2F2;
            border-radius: 5px;
            margin-bottom: 8px;
            text-align: center;
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
</style>
