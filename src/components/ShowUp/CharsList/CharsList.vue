<template>
  <div class="CharsList">
    <template v-for="(value, key, i) in chars" :key="value">
      <div>
        <p v-if="i !== 0">{{ categories[key] }}</p>
        <ul>
          <li v-for="item of value" :key="item.title">
            <div>
              <span>
                {{ item.title }}
              </span>
              <span>
                {{ calculatedPercentComputed(item, avgProdsChars[key]) }}%
              </span>
            </div>
            <div class="CharsList__progress progress">
              <div
                class="progress__bar"
                :style="{
                  backgroundColor: bgColors(),
                  transform: `translateX(${
                    calculatedPercentComputed(item, avgProdsChars[key]) - 100
                  }%)`,
                }"
              ></div>
            </div>
          </li>
        </ul>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { characteristics, values } from '../../../constants/chars'
import { calculatedPercent } from '../../../helper/calculatePercentage'
import { useMainStore } from '../../../stores'
import { computed, ref } from 'vue'
// import { colors as importedColors } from '../../../constants/colors'

export default {
  name: 'metrics',
  setup(props: any) {
    const mainStore = useMainStore()
    const avgProdsChars = computed(() => mainStore.averChProdChars)
    const chars = characteristics
    const categories = values
    console.log('-')
    console.log(props)
    console.log(chars)
    console.log('-')
    const colors = ref<any[]>([])
    const bgColors = () => {
      const max = colors.value.length > 0 ? colors.value.length - 1 : 0
      const randomNumber = Math.floor(Math.random() * max)
      const result =
        colors.value.length > 0 ? colors.value[randomNumber].value : '#fff'
      return result
    }
    const calculatedPercentComputed = calculatedPercent
    // // TEST. calculates total or selected charlist
    // const totalPrecent = computed(() => {
    //   let times = 0
    //   let summ = 0
    //   for (let item of characteristics!) {
    //     times++
    //     summ += +calculatedPercentComputed(item, props.avgProdsChars)
    //   }
    //   return summ / times
    // })
    // onMounted(() => {
    //   colors.value = [...importedColors]
    // })
    // return {
    //   colors,
    //   totalPrecent,
    //   bgColors,
    //   calculatedPercentComputed,
    // }
    return {
      avgProdsChars,
      chars,
      categories,
      calculatedPercentComputed,
      bgColors,
    }
  },
}
</script>

<style lang="scss">
.CharsList {
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 340px;

  & > div p {
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;

    color: #919191;

    margin-bottom: 16px;
  }

  ul {
    li {
      margin-bottom: 16px;

      & > div:first-child {
        display: flex;
        justify-content: space-between;
      }
      span {
        font-weight: 300;
        font-size: 16px;
        line-height: 19px;

        color: #000000;

        margin-bottom: 8px;

        &:last-child {
          font-weight: 500;
          font-size: 16px;
          line-height: 19px;

          color: #000000;
        }
      }
    }
  }

  .progress {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 16px;

    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.08);
    border-radius: 16px;

    &__bar {
      display: block;
      width: 100%;
      height: 16px;

      border-radius: 16px;
    }
    &__label {
      position: absolute;
      top: -10px;
      right: 0px;
    }
  }
}
</style>
