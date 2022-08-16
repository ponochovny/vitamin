<template>
  <ul :class="`${myClass} list`" v-if="characteristics">
    <li v-for="item of characteristics" :key="item.title" class="list__item">
      <div class="list__title">
        {{ itemBefore + item.title + itemAfter }}
      </div>
      <div class="list__progress progress">
        <div class="progress__bar">
          <span
            :style="{
              backgroundColor: bgColors(),
              width: `${calculatedPercentComputed(
                item,
                averageProductsCharacteristics
              )}%`,
            }"
          ></span>
        </div>
        <div class="progress__label">
          {{ calculatedPercentComputed(item, averageProductsCharacteristics) }}%
        </div>
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import { ref, onMounted, computed } from 'vue'
import { calculatedPercent } from '../../../helper/calculatePercentage'
import { colors as importedColors } from '../../../constants/colors'

export default {
  props: {
    averageProductsCharacteristics: Array,
    characteristics: Array,
    itemBefore: {
      type: String,
      default: '',
    },
    itemAfter: {
      type: String,
      default: '',
    },
    myClass: {
      type: String,
      default: '',
    },
  },
  name: 'app',
  setup(props) {
    const { characteristics } = props
    const colors = ref<any[]>([])

    const bgColors = () => {
      const max = colors.value.length > 0 ? colors.value.length - 1 : 0
      const randomNumber = Math.floor(Math.random() * max)
      const result =
        colors.value.length > 0 ? colors.value[randomNumber].value : '#fff'
      return result
    }
    const calculatedPercentComputed = (
      // @ts-ignore
      item,
      // @ts-ignore
      averageProductsCharacteristics
    ) => {
      return calculatedPercent(item, averageProductsCharacteristics)
    }

    // TEST. calculates total or selected charlist
    const totalPrecent = computed(() => {
      let times = 0
      let summ = 0

      for (let item of characteristics!) {
        times++
        summ += +calculatedPercentComputed(
          item,
          props.averageProductsCharacteristics
        )
      }

      return summ / times
    })

    onMounted(() => {
      colors.value = [...importedColors]
    })

    return {
      colors,

      totalPrecent,
      bgColors,
      calculatedPercentComputed,
    }
  },
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
