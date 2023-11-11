import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  User as IUserFB,
} from 'firebase/auth'
import { defineStore } from 'pinia'
import { useMainStore } from '..'
import { getRegisteredMeals, getUserChars } from '../../helper/fetch'
import { TRegisteredMeal } from '../../types'

class User {
  id: string
  registeredMeals: TRegisteredMeal[] | []
  basicChars: unknown[]

  constructor(
    id: string,
    registeredMeals: TRegisteredMeal[] | [],
    basicChars: unknown[]
  ) {
    this.id = id
    this.registeredMeals = registeredMeals
    this.basicChars = basicChars
  }
}

export type RootState = {
  user: User | null
  isUserChecked: boolean
  error: string | null
  isLoading: boolean
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
    setUserChecked(val: boolean) {
      this.isUserChecked = val
    },
    setUser(user: IUserFB) {
      this.user = new User(
        user.uid,
        this.user?.registeredMeals.length ? [...this.user.registeredMeals] : []
      )
    },
    async fetchUserRegData() {
      if (!this.user) return

      try {
        const res = await getRegisteredMeals(this.user.id)
        const data: TRegisteredMeal[] = res || []
        this.user.registeredMeals = [...data]

        console.log('[user] fetchUserRegData', this.user)
      } catch (error) {
        console.log('fetchUserRegData catch', error)
      }
    },
    setBasicChars(data: unknown[] = []) {
      if (!this.user) return

      this.user.basicChars = [...data]
    },
    async fetchUserCharsData() {
      if (!this.user) return

      try {
        await getUserChars(this.user.id)
        // const data: TRegisteredMeal[] = res || []
        // this.user.registeredMeals = [...data]

        // console.log('[user] fetchUserRegData', this.user)
      } catch (error: any) {
        throw new Error(error)
        // console.log('fetchUserRegData catch', error)
      }
    },
    async loginUser({ email, password }: { email: string; password: string }) {
      this.error = null
      this.isLoading = true

      const auth = getAuth()

      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        )

        const user = userCredential.user

        this.user = new User(user.uid, [])
        this.isLoading = false

        useMainStore().fetchChars()

        return userCredential
      } catch (error: any) {
        console.log('[loginUser] ERROR:', error)

        this.isLoading = false
        this.error = error.message

        throw new Error(error)
      }
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

      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        )

        const user = userCredential.user

        this.user = new User(user.uid, [])
        this.isLoading = false

        return userCredential
      } catch (error: any) {
        console.log('[createUserWithEmailAndPassword] ERROR:', error.message)

        this.error = error.message
        this.isLoading = false

        throw new Error(error)
      }
    },
  },
})
