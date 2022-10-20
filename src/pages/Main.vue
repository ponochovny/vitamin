<template>
  <div class="Main">
    <transition mode="out-in">
      <div class="Main__content" v-if="isUserLoggedIn">
        <div class="FilledDays">
          <transition mode="out-in">
            <template v-if="!registeredMeals.length"><Spinner /></template>
            <ul v-else>
              <li v-for="day in filledLastDays(5, registeredMeals)" :key="day">
                <p>
                  {{ formatedDate(day.date)[0] }},
                  <span>{{ formatedDate(day.date)[1] }}</span>
                </p>
                <div class="progress">
                  <div
                    class="progress__line"
                    :style="{ transform: `translateX(${day.filled - 100}%)` }"
                  ></div>
                </div>
              </li>
            </ul>
          </transition>
        </div>
        <button class="btn btn-accent btn-p2" @click="$router.push('/fill')">
          Fill the day
        </button>
      </div>
      <div class="Main__login" v-else>
        <span>
          You are not authorized. <router-link to="/auth">Log in</router-link>,
          please
        </span>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { computed } from 'vue'
import { useMainStore } from '../stores'
import dayjs from 'dayjs'
import FilledLastDays from '../utils/FillDays'
import Spinner from '../components/Spinner/Spinner.vue'

export default {
  name: 'main-page',
  components: {
    Spinner,
  },
  setup() {
    const isUserLoggedIn = computed(() => useMainStore().isUserLoggedIn)
    const registeredMeals = computed(() => useMainStore().registeredMeals)
    function formatedDate(dateString: number) {
      const date = dayjs(dateString)
      const dateStr = date.format('ddd, D')
      return dateStr.split(',')
    }
    return {
      formatedDate,
      filledLastDays: FilledLastDays,
      registeredMeals,
      isUserLoggedIn,
    }
  },
}
</script>

<style lang="scss">
.Main {
  display: flex;
  padding-top: 84px;

  &__content {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    gap: 36px;
    flex: 1;
  }

  &__login {
    display: flex;
    flex: 1;
    justify-content: center;
  }

  .FilledDays {
    display: inline-flex;
    align-content: center;
    justify-content: center;

    min-width: 440px;
    min-height: 56px;

    padding: 12px 16px;
    box-shadow: 0px 1px 16px rgba(0, 0, 0, 0.08);
    border-radius: 4px;

    & > span {
      justify-self: center;
      align-self: center;
    }

    ul {
      display: flex;
      gap: 12px;
      li {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: column;
        gap: 4px;

        width: 72px;
        height: 32px;
        p {
          font-family: 'Roboto';
          font-style: normal;
          font-weight: 400;
          font-size: 12px;
          line-height: 14px;

          color: #000000;

          span {
            color: #949494;
          }
        }

        .progress {
          position: relative;
          width: 72px;
          height: 14px;
          box-shadow: 0px 3px 12px rgba(0, 0, 0, 0.12);
          border-radius: 7px;
          overflow: hidden;

          &__line {
            position: relative;
            width: 100%;
            height: 100%;
            border-radius: 7px;
            background: linear-gradient(
              270deg,
              #70ffdd 0%,
              rgba(63, 128, 255, 0.58) 100%
            );
          }
        }
      }
    }
  }
}
</style>
