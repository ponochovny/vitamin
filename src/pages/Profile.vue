<template>
  <div class="Profile">
    <div class="Profile__title">Profile</div>
    <Spinner v-if="isLoading" />
    <div class="Profile__form" v-if="filledChars">
      <button
        type="button"
        @click="addColumn"
        :style="{ marginBottom: '20px' }"
      >
        Add column
      </button>
      <div
        class="fieldsetGroup wl-15 wi-10"
        v-for="(value, char) of charsValues"
        :key="char"
      >
        <div class="fieldset__title">{{ value }}</div>
        <div
          class="fieldset"
          v-for="(item, i) of filledChars[char]"
          :key="item"
        >
          <div class="fieldset__label">{{ item.title }}</div>
          <input
            type="number"
            min="0"
            class="fieldset__input"
            v-for="(item, j) of versionsCounter"
            :key="item"
            v-model.number.lazy="filledChars[char][i].values[j].value"
          />
        </div>
      </div>
      <!-- Source start -->

      <div class="fieldsetGroup wl-15 wi-10">
        <div class="fieldset__title">Sources:</div>
        <div class="fieldset">
          <div class="fieldset__label"></div>
          <input
            type="text"
            class="fieldset__input"
            v-for="(item, j) of versionsCounter"
            :key="item"
            v-model.lazy="
              filledChars[Object.keys(filledChars)[0]][0].values[j].origin
            "
          />
        </div>
      </div>
      <!-- SOURCE end -->
      <button type="button" @click="dispatchUpdateData">Update</button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ref, watch, onMounted } from 'vue'
import { values } from '../constants/chars'
import { maxAmountVersions, fullFilledChars } from '../helper'
import Spinner from '../components/Spinner/Spinner.vue'
import { useMainStore } from '../stores'

export default {
  components: {
    Spinner,
  },
  setup() {
    const wait = ref(false)
    const isLoading = ref(false)

    const filledChars = ref(null)

    const versionsCounter = ref(1)
    const charsValues = ref(values)

    const dispatchUpdateData = () => {
      if (filledChars.value === null) return alert('nonono')

      useMainStore().updateUserChars(filledChars.value)
    }

    const fill = () => {
      filledChars.value = fullFilledChars(useMainStore().userChars)

      if (useMainStore().userChars) {
        // @ts-ignore
        versionsCounter.value = maxAmountVersions(useMainStore().userChars)
      }
    }

    const addColumn = () => {
      for (const [key, _] of Object.entries(charsValues.value)) {
        // @ts-ignore
        filledChars.value[key] = filledChars.value[key].map((item) => {
          const newValues = [...item.values]
          newValues.push({ origin: '', value: null })
          return {
            ...item,
            values: [...newValues],
          }
        })
      }

      versionsCounter.value = versionsCounter.value + 1
    }

    const userCharsVar = computed(() => useMainStore().userChars)

    onMounted(() => {
      if (useMainStore().user === null) {
        wait.value = true // set flag for refill
        isLoading.value = true
      } else {
        fill()
      }
    })

    watch(userCharsVar, (newValue, oldValue) => {
      console.log(`Updating from ${oldValue} to ${newValue}`)
      if (oldValue === null && wait.value) {
        fill()
        isLoading.value = false
      }
    })

    return {
      wait,
      isLoading,
      filledChars,
      versionsCounter,
      charsValues,
      userCharsVar,

      dispatchUpdateData,
      addColumn,
    }
  },
}
</script>

<style lang="scss">
.Profile {
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 20px;
  &__title {
    font-size: 36px;
    margin-bottom: 20px;
  }
}
</style>
