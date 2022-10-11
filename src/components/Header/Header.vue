<template>
  <div class="Header">
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
          $route.matched.some(({ path }) => path === '/login')
            ? 'router-link-active'
            : ''
        }`"
        @click="logOut"
      >
        Log In
      </button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'component-header',
  setup() {},
}
</script>

<style lang="scss">
.Header {
  position: fixed;
  top: 16px;
  left: $wrapper_padding_desc;

  height: 46px;
  width: $wrapper_width;
  max-width: $wrapper_maxWidth;

  display: flex;
  justify-content: space-between;
  align-items: center;

  &__logo {
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
    button {
      padding: 8px 12px;
    }
  }
}
</style>
