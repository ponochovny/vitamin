<template>
  <div class="History">
    <template v-if="items.length">
      <div class="History__item" v-for="item of items" :key="item.title">
        <span :style="{ width: `${item.percentage}%` }"></span>
        <div class="History__title">
          {{ date(item) }}
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { datePrettier } from '../../../helper'

export default {
  props: ['items'],
  name: 'the-history',
  setup() {
    // @ts-ignore
    const date = (item) => datePrettier(item.date)

    return {
      date,
    }
  },
}
</script>

<style lang="scss">
.History {
  width: 560px;
  &__item {
    position: relative;
    display: inline-block;
    width: 263px;
    height: 65px;
    background: #f2f2f2;
    border-radius: 5px;
    margin-right: 34px;
    margin-bottom: 28px;

    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 24px;
    line-height: 28px;

    color: #161616;
    &:nth-child(even) {
      margin-right: 0;
    }

    span {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;

      background: linear-gradient(
        270deg,
        #70ffdd 0%,
        rgba(63, 128, 255, 0.58) 100%
      );
      border-radius: 5px;
    }
  }
  &__title {
    display: inline-block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
