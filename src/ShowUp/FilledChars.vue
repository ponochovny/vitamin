<template>
  <div class="FilledChars">
    <h2>Б/Ж/У</h2>
    <CharList
        :myClass="'FilledChars__list'"
        :productCharacteristics="productCharacteristics.foodEnergy"
        :characteristics="characteristics.foodEnergy"
    />
    <h2>Витамины</h2>
    <CharList
        :myClass="'FilledChars__list'"
        :productCharacteristics="productCharacteristics.vitamins"
        :characteristics="characteristics.vitamins"
        :itemBefore="'Витамин '"
        :itemAfter="', мг'"
    />
    <h2>Микро/Макроелементы</h2>
    <CharList
        :productCharacteristics="productCharacteristics.macromicto"
        :characteristics="characteristics.macromicto"
        :itemAfter="', мг'"
    />
  </div>
</template>

<script>
import CharList from './CharList/CharList'

export default {
    props: ['productCharacteristics'],
    name: 'app',
    components: {
        'CharList': CharList
    },
    data () {
        return {
        }
    },
    computed: {
        characteristics() {
            return this.$store.getters.basicCharacteristics
        }
    },
    methods: {
    },
    mounted() {
    }
}
</script>

<style lang="scss">
    .FilledChars {
        .list {
            &__item {
                margin-bottom: 33px;
            }
            &__title {
                display: inline-block;
                width: 175px;

                font-family: Roboto;
                font-style: normal;
                font-weight: normal;
                font-size: 18px;
                line-height: 21px;

                color: #000000;
            }
        }
        .progress {
            position: relative;
            display: inline-block;
            &__bar {
                position: relative;
                display: inline-block;
                vertical-align: middle;
                width: 130px;
                height: 20px;
                border-radius: 30px;
                background-color: #F2F2F2;
                border: 1px solid #C8C8C8;
                margin-right: 12px;
                overflow: hidden;
                span {
                    position: absolute;
                    top: -1px;
                    left: 0;
                    height: calc(100% + 2px);
                    max-width: 100%;
                    // border-radius: 30px;
                }
            }
            &__label {
                display: inline-block;
                vertical-align: middle;

                font-family: Roboto;
                font-style: normal;
                font-weight: normal;
                font-size: 18px;
                line-height: 21px;

                color: #000000;
            }
        }
        h2 {
            font-family: Roboto;
            font-style: normal;
            font-weight: normal;
            font-size: 24px;
            line-height: 28px;

            color: #A8A8A8;

            margin-bottom: 40px;
        }
    }
</style>
