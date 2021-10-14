<template>
    <ul :class="`${myClass} list`" v-if="characteristics">
        <li v-for="(item) of characteristics" :key="item.title" class="list__item">
            <div class="list__title">
                {{ itemBefore + item.title + itemAfter }}
            </div>
            <div class="list__progress progress">
                <div class="progress__bar">
                    <span :style="{backgroundColor: bgColors(), width: `${calculatedPercent(item)}%`}"></span>
                </div>
                <div class="progress__label">
                    {{ calculatedPercent(item) }}%
                </div>
            </div>
        </li>
    </ul>
</template>

<script>
import {colors} from '../../constants/colors'

export default {
    props: {
        productCharacteristics: Array,
        characteristics: Array,
        itemBefore: {
            type: String,
            default: ''
        },
        itemAfter: {
            type: String,
            default: ''
        },
        myClass: {
            type: String,
            default: ''
        }
    },
    name: 'app',
    data () {
        return {
            colors: []
        }
    },
    methods: {
        bgColors: function() {
            let max = this.colors.length > 0 ? this.colors.length-1 : 0
            let randomNumber = Math.floor(Math.random() * max)
            let result = this.colors.length > 0 ? this.colors[randomNumber].value : '#fff'
            return result
        },
        average: function(arr) {
            let counter = 0
            let summ = 0
            for (let item of arr) {
                counter++
                summ += item.value
            }
            return summ/counter
        },
        averageFromMax: function(arrMax, fillArr) {
            let fill = this.average(fillArr)
            let max = this.average(arrMax)
            const result = (fill*100)/max
            return result.toFixed(0)
        },
        calculatedPercent: function(item) {
            let findItem = this.productCharacteristics ? this.productCharacteristics.find(productItem => productItem.title === item.title) : undefined
            return !findItem ? '0' : this.averageFromMax(item.values, findItem.versions)
        }
    },
    computed: {
    },
    mounted() {
        this.colors = [...colors]
    }
}
</script>

<style lang="scss">
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
</style>
