<template>
  <div class="Auth">
    <div class="Auth__container">
      <form @submit.prevent="submit">
        <div class="Auth__title">
          {{ loginAction ? 'Log in' : 'Register' }}
        </div>
        <input type="text" placeholder="Your email" v-model="email" />
        <input type="password" placeholder="Your password" v-model="password" />
        <p>
          {{ loginAction ? 'New user?' : 'Already have an account?' }}
          <button
            class="btn btn-link"
            type="button"
            @click="loginAction = !loginAction"
          >
            {{ loginAction ? 'Register' : 'Log in' }}
          </button>
        </p>
        <button class="btn btn-secondary btn-p1" type="submit">
          <template v-if="isLoading">
            <div class="loader">...</div>
          </template>
          <template v-else>
            {{ loginAction ? 'Log in' : 'Register' }}
          </template>
        </button>
      </form>
    </div>
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
}
</script>

<style lang="scss">
.Auth {
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &__container {
    padding: 32px 80px;
    background: #ffffff;
    box-shadow: 0px 1px 16px rgba(0, 0, 0, 0.08);
    border-radius: 40px;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: stretch;

    p {
      width: 100%;

      font-family: 'Roboto';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 16px;

      color: #000000;

      margin-bottom: 24px;
    }
  }
  &__title {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 500;
    font-size: 36px;
    line-height: 42px;

    color: #000000;

    margin-bottom: 32px;
  }
  input {
    width: 280px;
    height: 35px;

    background: #f7f7f7;
    border: 0;
    border-radius: 12px;
    padding: 8px 16px;

    margin-bottom: 14px;

    font-family: 'Roboto';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;

    color: #b8b8b8;

    transition: color 0.35s ease;

    &:focus {
      color: #000;
    }
  }
}
</style>
