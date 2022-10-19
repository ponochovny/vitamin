<template>
  <div class="Header">
    <div class="Header__wrapper">
      <div class="Header__logo">
        <router-link to="/">
          <img src="../../assets/leaf.png" alt="" />
        </router-link>
      </div>
      <nav>
        <ul>
          <li>
            <router-link class="route-link" exact to="/">Home</router-link>
          </li>
          <li>
            <router-link class="route-link" exact to="/fill"
              >Fill the day</router-link
            >
          </li>
          <li>
            <router-link class="route-link" exact to="/profile"
              >Profile</router-link
            >
          </li>
        </ul>
      </nav>
      <div class="Header__rightSide">
        <button
          :class="`btn-link route-link ${
            $route.matched.some(({ path }) => path === '/auth')
              ? 'router-link-active'
              : ''
          }`"
          @click="isUserLoggedIn ? logOut() : logIn()"
        >
          {{ isUserLoggedIn ? 'Log out' : 'Log In' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useMainStore } from '../../stores'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
export default {
  name: 'component-header',
  setup() {
    const router = useRouter()
    const isUserLoggedIn = computed<boolean>(
      () => useMainStore().isUserLoggedIn
    )
    function logIn() {
      console.log('log in')
      router.push('/auth')
    }
    function logOut() {
      console.log('log out')
      useMainStore().logoutUser()
    }

    return {
      isUserLoggedIn,
      logIn,
      logOut,
    }
  },
}
</script>

<style lang="scss">
.Header {
  position: fixed;
  top: 0;
  left: 0;

  height: calc(46px + 32px);
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #fff;

  z-index: 1;

  &__wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: $wrapper_width;
    max-width: $wrapper_maxWidth;
  }

  &__logo {
    display: flex;
    flex-grow: 1;
    flex-basis: 0;
    width: 42px;
    height: 46px;
    a {
      position: relative;
      display: inline-block;

      &:before {
        content: '';
        position: absolute;
        left: -10px;
        top: -10px;
        width: calc(100% + 20px);
        height: calc(100% + 20px);
        background-color: $grey;
        border-radius: 16px;
        z-index: -1;

        opacity: 0;
        transition: opacity 0.35s ease;
      }

      &:hover {
        &:before {
          opacity: 1;
        }
      }
    }
    img {
      max-width: 42px;
      max-height: 46px;
    }
  }

  nav {
    a {
      padding: 8px 12px;

      &.route-link {
        font-weight: 500;
      }
    }
    ul {
      display: flex;
      gap: 9px;
    }
  }

  &__rightSide {
    display: flex;
    justify-content: flex-end;
    flex-grow: 1;
    flex-basis: 0;
    button {
      padding: 8px 12px;
    }
  }
}
</style>
