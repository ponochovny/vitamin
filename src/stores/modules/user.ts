import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { defineStore } from 'pinia'
import { useMainStore } from '..'

class User {
  id: string

  constructor(id: string) {
    this.id = id
  }
}

export type RootState = {
  user: User | null
  isUserChecked: boolean
  error: String | null
  isLoading: Boolean
}

export const useUserStore = defineStore('user', {
  state: () =>
    ({
      user: null,
      isUserChecked: false,
      error: null,
      isLoading: false,
    } as RootState),
  getters: {
    isUserLoggedIn(state) {
      return state.user !== null
    },
  },
  actions: {
    setUserChecked() {
      this.isUserChecked = true
    },
    autoLoginUser(user: { uid: string }) {
      this.user = new User(user.uid)
      if (user) {
        useMainStore().fetchRegisteredMeals()
        useMainStore().fetchChars()
      }
    },
    async loginUser({ email, password }: { email: string; password: string }) {
      this.error = null
      this.isLoading = true

      const auth = getAuth()

      return new Promise(async (resolve, reject) => {
        try {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
          )

          const user = userCredential.user

          this.user = new User(user.uid)
          this.isLoading = false

          useMainStore().fetchChars()

          resolve(userCredential)
        } catch (error: any) {
          console.log('[loginUser] ERROR:', error)

          this.isLoading = false
          this.error = error.message

          reject(error)
        }
      })
    },
    logoutUser() {
      signOut(getAuth())
      this.user = null

      useMainStore().registeredMeals = []
    },
    async registerUser({
      email,
      password,
    }: {
      email: string
      password: string
    }) {
      const auth = getAuth()

      this.error = null
      this.isLoading = true

      return new Promise(async (resolve, reject) => {
        try {
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          )

          const user = userCredential.user

          this.user = new User(user.uid)
          this.isLoading = false

          resolve(userCredential)
        } catch (error: any) {
          console.log('[createUserWithEmailAndPassword] ERROR:', error.message)

          this.error = error.message
          this.isLoading = false

          reject(error)
        }
      })
    },
  },
})
