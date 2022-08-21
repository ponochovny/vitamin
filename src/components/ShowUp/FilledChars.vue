<template>
  <div :class="classes">
    <h2 :style="{ marginBottom: '35px' }">От дневной нормы</h2>
    <div class="FilledChars">
      <h2>Б/Ж/У [total: {{ totalPercent('foodEnergy') }}]</h2>
      <CharList
        :myClass="'FilledChars__list'"
        :averageProductsCharacteristics="
          averageProductsCharacteristics.foodEnergy
        "
        :characteristics="characteristics.foodEnergy"
      />
      <h2>Витамины [total: {{ totalPercent('vitamins') }}]</h2>
      <CharList
        :myClass="'FilledChars__list'"
        :averageProductsCharacteristics="
          averageProductsCharacteristics.vitamins
        "
        :characteristics="characteristics.vitamins"
        :itemBefore="'Витамин '"
        :itemAfter="', мг'"
      />
      <h2>Микро/Макроелементы [total: {{ totalPercent('macroMicro') }}]</h2>
      <CharList
        :averageProductsCharacteristics="
          averageProductsCharacteristics.macroMicro
        "
        :characteristics="characteristics.macroMicro"
        :itemAfter="', мг'"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, watch } from 'vue'
import CharList from './CharList/CharList.vue'
import { calculatedPercent } from '../../helper/calculatePercentage'
import { useMainStore } from '../../stores'

export default {
  name: 'filledChars',
  props: ['classes'],
  components: {
    CharList: CharList,
  },
  setup() {
    const characteristics: any = computed(
      () => useMainStore().basicCharacteristics
    )
    const averageProductsCharacteristics = computed(
      () => useMainStore().averChProdChars
    )

    // @ts-ignore
    const totalPercent = (parameter) => {
      // TODO: use reducer
      let times = 0
      let summ = 0
      let result = 0

      for (const item of characteristics.value[parameter]) {
        times++
        summ += +calculatedPercent(
          item,
          // @ts-ignore
          useMainStore().averChProdChars[parameter]
        )
      }

      result = +(summ / times).toFixed(2)

      return result > 100 ? 100 : +result
    }

    watch(averageProductsCharacteristics, (oldVal, newVal: any) => {
      const summ =
        totalPercent('foodEnergy') +
        totalPercent('vitamins') +
        totalPercent('macroMicro')
      const result: number = +(summ / 3).toFixed(2)

      if (
        newVal.percentage !== oldVal.percentage ||
        newVal.percentage === undefined
      ) {
        useMainStore().allTotalPercentage(result > 100 ? 100 : +result)
      }
    })

    return {
      characteristics,
      averageProductsCharacteristics,
      totalPercent,
    }
  },
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
      background-color: #f2f2f2;
      border: 1px solid #c8c8c8;
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

    color: #a8a8a8;

    margin-bottom: 40px;
  }
}
</style>
