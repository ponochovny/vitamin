<template>
  <div class="ProductsSearch">
    <div class="ProductsSearch__input">
      <input type="text" placeholder="Seach..." v-model="search" />
      <div class="ProductsSearch__filter">
        <button class="btn">
          <svg
            width="11"
            height="10"
            viewBox="0 0 11 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="3" height="10" rx="1.5" fill="#D9D9D9" />
            <rect x="4" y="4" width="3" height="6" rx="1.5" fill="#D9D9D9" />
            <rect x="8" y="2" width="3" height="8" rx="1.5" fill="#D9D9D9" />
          </svg>
        </button>
      </div>
    </div>
    <div class="ProductsSearch__list">
      <div class="centered" v-if="filteredList.length === 0">
        <spinner />
      </div>
      <ul>
        <li
          v-for="item of filteredList"
          :key="item.id"
          :title="item.title"
          @click="addProductToChoosen(item)"
        >
          {{ item.title }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed } from 'vue'
import { useMainStore } from '../../stores'
import Spinner from '../Spinner/Spinner.vue'

export default {
  components: { Spinner },
  name: 'ProductsSearch',
  setup() {
    const search = ref('')
    const filteredList = computed(() =>
      useMainStore().productsList.filter((el) =>
        el.title.toLowerCase().includes(search.value.toLowerCase())
      )
    )
    // @ts-ignore
    const addProductToChoosen = (item) => {
      if (useMainStore().choosenProducts.find((el) => el.id === item.id)) return
      useMainStore().addProductToChoosen({
        ...item,
      })
    }

    return {
      search,
      filteredList,
      addProductToChoosen,
    }
  },
}
</script>

<style lang="scss">
.ProductsSearch {
  &__filter {
    line-height: 0;
    padding: 4px;
    background-color: #fbfbfb;
    border-radius: 4px;
    .btn {
      line-height: 0;
    }
  }
  &__input {
    position: relative;
    input {
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 16px;

      color: #000000;

      height: 24px;
      padding: 4px 8px;

      border-bottom: 1px solid rgba(#000, 0.55);

      &::placeholder {
        color: rgba(#000, 0.4);
      }
    }
    .ProductsSearch__filter {
      position: absolute;
      left: -22px;
      top: 3px;
    }
  }

  &__list {
    padding: 10px 0;
    width: 180px;
    ul {
      height: 154px;
      overflow-y: scroll;
      li {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;

        color: #000000;

        padding: 6px 8px;

        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        padding-right: 27px;

        &.active,
        &:hover {
          background-color: #f0f0f0;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
