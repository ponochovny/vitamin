<template>
  <div class="Menu">
    <div class="Menu__logo">
      <router-link to="/">
        <img src="../../assets/leaf.png" alt="" />
      </router-link>
    </div>
    <ul>
      <li>
        <router-link exact to="/">Main page</router-link>
      </li>
      <!-- <li v-if="isUserLoggedIn">
				<router-link to="/profile">Profile</router-link>
			</li>
			<li v-if="!isUserLoggedIn">
				<router-link to="/auth">Log in</router-link>
			</li>
			<li v-if="isUserLoggedIn" @click="logOut">
				<a href="#">Log out</a>
			</li> -->
    </ul>
  </div>
</template>

<script lang="ts">
export default {
  name: 'component-menu',
  computed: {
    // isUserLoggedIn() {
    // 	return this.$store.getters.isUserLoggedIn
    // },
  },
  methods: {
    // logOut: function () {
    // 	this.$store.dispatch('logoutUser')
    // 	this.$router.push('/')
    // },
  },
}
</script>

<style lang="scss">
.Menu {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  align-content: flex-start;
  width: 100%;
  height: 80px;
  box-shadow: 0px 4px 12px rgba(#333333, 0.2);
  padding: 10px 40px;
  &__logo {
    height: 60px;
    padding: 5px 15px;
    border-radius: 5px;
    transition: background-color 0.15s ease;
    img {
      max-width: 100%;
      max-height: 100%;
    }
    &:hover {
      background-color: #f2f2f2;
    }
  }
  ul {
    height: 100%;
    li {
      display: inline-block;
      height: 100%;

      font-family: Roboto;
      font-style: normal;
      font-weight: normal;
      font-size: 18px;
      line-height: 21px;

      margin-right: 10px;
      a {
        display: flex;
        align-items: center;
        padding: 0 16px;
        width: 100%;
        height: 100%;
        border-radius: 5px;

        text-decoration: none;
        color: #000000;
        &.router-link-active {
          background-color: #f2f2f2;
        }
        &:hover {
          color: #696969;
          background-color: #f2f2f2;
          transition: color 35s ease, background-color 0.05s ease;
        }
      }
    }
  }
}
</style>
