<template>
  <div class="FilledChars">
    <h2 class="FilledChars__title">От дневной нормы</h2>
    <h2 class="FilledChars__subtitle">
      Б/Ж/У [total: {{ totalPercent('foodEnergy') }}]
    </h2>
    <CharList
      :myClass="'FilledChars__list'"
      :averageProductsCharacteristics="
        averageProductsCharacteristics.foodEnergy
      "
      :characteristics="characteristics.foodEnergy"
    />
    <h2 class="FilledChars__subtitle">
      Витамины [total: {{ totalPercent('vitamins') }}]
    </h2>
    <CharList
      :myClass="'FilledChars__list'"
      :averageProductsCharacteristics="averageProductsCharacteristics.vitamins"
      :characteristics="characteristics.vitamins"
      :itemBefore="'Витамин '"
      :itemAfter="', мг'"
    />
    <h2 class="FilledChars__subtitle">
      Микро/Макроелементы [total: {{ totalPercent('minerals') }}]
    </h2>
    <CharList
      :averageProductsCharacteristics="averageProductsCharacteristics.minerals"
      :characteristics="characteristics.minerals"
      :itemAfter="', мг'"
    />
  </div>
</template>

<script lang="ts">
import { computed, watch } from 'vue'
import CharList from './CharList/CharsList.vue'
import { calculatedPercent } from '../../helper/calculatePercentage'
import { useMainStore } from '../../stores'

export default {
  name: 'filledChars',
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
      if (
        newVal.percentage !== oldVal.percentage ||
        newVal.percentage === undefined
      ) {
        const summ =
          totalPercent('foodEnergy') +
          totalPercent('vitamins') +
          totalPercent('minerals')
        const result: number = +(summ / 3).toFixed(2)

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
  width: 33%;
  .list {
    &__item {
      width: 33%;
      margin-bottom: 16px;
      display: inline-flex;
      flex-direction: column;
      align-items: center;
    }
    &__title {
      display: inline-block;

      font-family: Roboto;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 18px;
      margin-bottom: 4px;

      color: #000000;
    }
  }
  .progress {
    position: relative;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    &__bar {
      position: relative;
      display: inline-block;
      vertical-align: middle;
      width: 90px;
      height: 14px;
      border-radius: 30px;
      background-color: #f2f2f2;
      border: 1px solid #c8c8c8;
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
      // display: inline-block;
      // vertical-align: middle;

      font-family: Roboto;
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 21px;

      color: #000000;
    }
  }
  &__subtitle {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 21px;
    line-height: 24px;
    color: #a8a8a8;
    margin-bottom: 21px;
  }
  // &__title {
  //   font-size: 32px;
  //   line-height: 20px;
  //   margin-bottom: 38px;
  // }
}
</style>
