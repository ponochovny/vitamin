<template>
  <div class="Profile">
    <div class="Profile__wrapper">
      <div class="Profile__setChars">
        <div class="Profile__subtitle">
          <span>Set characteristics</span>
          <span
            @click="autoCalculation = !autoCalculation"
            :class="autoCalculation ? 'active' : ''"
          >
            <svg
              width="19"
              height="6"
              viewBox="0 0 19 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.3333 3C13.3333 4.47276 14.5272 5.66667 16 5.66667C17.4728 5.66667 18.6667 4.47276 18.6667 3C18.6667 1.52724 17.4728 0.333333 16 0.333333C14.5272 0.333333 13.3333 1.52724 13.3333 3ZM0 3.5L16 3.5V2.5L0 2.5L0 3.5Z"
                :fill="autoCalculation ? 'var(--black)' : '#D0D0D0'"
              />
            </svg>
            Auto-calculation</span
          >
        </div>
        <div class="Profile__groups">
          <div class="Profile__group">
            <div class="Profile__group-title">Energy</div>
            <div class="Profile__group-row">
              <span>Energy, kkal</span>
              <input type="text" value="10" />
            </div>
            <div class="Profile__group-row">
              <span>Energy, kkal</span>
              <input type="text" value="10" />
            </div>
            <div class="Profile__group-row">
              <span>Energy, kkal</span>
              <input type="text" value="10" />
            </div>
            <div class="Profile__group-row">
              <span>Energy, kkal</span>
              <input type="text" value="10" />
            </div>
          </div>
          <div class="Profile__group">
            <div class="Profile__group-title">Vitamins</div>
            <div class="Profile__group-row">
              <span>Energy, kkal</span>
              <input type="text" value="10" />
            </div>
            <div class="Profile__group-row">
              <span>Energy, kkal</span>
              <input type="text" value="10" />
            </div>
            <div class="Profile__group-row">
              <span>Energy, kkal</span>
              <input type="text" value="10" />
            </div>
            <div class="Profile__group-row">
              <span>Energy, kkal</span>
              <input type="text" value="10" />
            </div>
          </div>
          <button class="btn btn-accent btn-p2">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Spinner from '../components/Spinner/Spinner.vue'
import { ref } from 'vue'

export default {
  components: {
    Spinner,
  },
  setup() {
    const autoCalculation = ref(false)

    return {
      autoCalculation,
    }
  },
}
</script>

<style lang="scss">
.Profile {
  display: flex;
  flex-direction: column;
  align-items: center;

  padding-top: 34px;
  &__wrapper {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;

    max-width: $wrapper_maxWidth;
    width: $wrapper_width;
  }
  &__subtitle {
    font-weight: 400;
    font-size: 24px;
    line-height: 28px;

    display: flex;
    align-items: center;
    gap: 12px;

    span {
      display: flex;
      align-items: center;
      &:nth-child(2) {
        gap: 12px;
        color: #d0d0d0;

        transition: color 0.35s ease;
        svg {
          path {
            transition: fill 0.35s ease;
          }
        }

        &.active {
          color: var(--black);
        }

        &:hover {
          cursor: pointer;
        }
      }
    }
  }
}
</style>
