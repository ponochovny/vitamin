<template>
  <div class="Auth">
    <form @submit.prevent="submit">
      <div class="Auth__title">
        {{ loginAction ? 'Log in' : 'Register' }}
      </div>
      <p>Email:</p>
      <input type="text" v-model="email" />
      <p>Password:</p>
      <input type="password" v-model="password" />
      <button class="btn btn_spinner" type="submit">
        <template v-if="isLoading">
          <div class="loader">...</div>
        </template>
        <template v-else>
          {{ loginAction ? 'Log in' : 'Register' }}
        </template>
      </button>
      <p>
        {{ loginAction ? 'New user?' : 'Have an account?' }}
        <button
          class="btn btn_link"
          type="button"
          @click="loginAction = !loginAction"
        >
          {{ loginAction ? 'Register' : 'Log in' }}
        </button>
      </p>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useToast } from 'vue-toastification'
import router from '../router'
import { useMainStore } from '../stores'

export default {
  name: 'auth',
  setup() {
    const email = ref('')
    const password = ref('')
    const loginAction = ref(true)
    const isLoading = ref(false)
    const toast = useToast()

    const submit = () => {
      isLoading.value = true

      if (loginAction.value) {
        useMainStore()
          .loginUser({ email: email.value, password: password.value })
          .then(() => {
            router.push('/')
            toast.success('Log in success!')
          })
          .catch((err) => {
            isLoading.value = false
            toast.error(`Log in error: ${err}`)
          })
      } else {
        useMainStore()
          .registerUser({
            email: email.value,
            password: password.value,
          })
          .then(() => {
            router.push('/')
            toast.success('Registration success!')
          })
          .catch((err) => {
            isLoading.value = false
            toast.error(`Registeration error: ${err}`)
          })
      }
    }

    return {
      email,
      password,
      loginAction,
      isLoading,
      toast,

      submit,
    }
  },
  created() {
    // window.location.hash
    if (this.$route.query['loginError']) {
      this.toast.error('Please log in to access this page')
    }
  },
}
</script>

<style lang="scss">
.Auth {
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    button {
      margin-bottom: 20px;
    }
  }
  &__title {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 48px;
    line-height: 56px;

    color: #000000;

    margin-bottom: 25px;

    padding: 5px 15px;
    border-radius: 5px;
    transition: background-color 0.15s ease;
  }
  p {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 21px;

    color: #000;

    margin-bottom: 8px;
  }
  input {
    width: 263px;
    height: 41px;
    margin-bottom: 27px;
    padding: 0 7px;
    background-color: #f2f2f2;
    border: 1px solid #b5b5b5;
    border-radius: 5px;

    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 21px;

    color: #606060;

    text-align: center;

    transition: color 0.35s ease;

    &:focus {
      color: #000;
    }
  }
  button {
    padding-left: 30px;
    padding-right: 30px;
  }
}

// Spinner
.btn_spinner {
  position: relative;
  overflow: hidden;
}
.loader,
.loader:after {
  border-radius: 50%;
  width: 10em;
  height: 10em;
}
.loader {
  font-size: 0.1188rem;
  position: relative;
  text-indent: -9999em;
  border-top: 2em solid rgba(43, 255, 0, 0.2);
  border-right: 2em solid rgba(43, 255, 0, 0.2);
  border-bottom: 2em solid rgba(43, 255, 0, 0.2);
  border-left: 2em solid #2bff00;
  transform: translateZ(0);
  animation: load8 1.1s infinite linear;
}
@-webkit-keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
