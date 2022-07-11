import { defineStore } from 'pinia'
import { fetch, getProducts, getRegisteredMeals, patch } from '../helper/fetch'
import { Characteristics, Product, RegisteredMeal } from '../types'
import { areTwoDatesEquels, summOfValueOfArray } from '../helper'
import { characteristics } from '../constants/chars'
import { average } from '../helper/calculatePercentage'
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'

class User {
  id: string

  constructor(id: string) {
    this.id = id
  }
}

export type RootState = {
  user: null | { id: string }
  userChars: null | Characteristics
  isLoading: boolean
  error: string | null
  productsList: Product[]
  registeredMeals: RegisteredMeal[]
  choosenProducts: Product[]
  averChProdChars: {}
}

export const useMainStore = defineStore({
  id: 'mainStore',
  state: () =>
    ({
      user: null,
      userChars: null,
      isLoading: true,
      error: null,
      productsList: [],
      registeredMeals: [],
      choosenProducts: [],
      averChProdChars: {},
    } as RootState),
  actions: {
    async fetchProducts() {
      this.isLoading = true

      const data: Product[] = await getProducts()
      this.productsList = [...data]

      this.isLoading = false
    },
    async fetchRegisteredMeals() {
      this.isLoading = true

      const data: RegisteredMeal[] = await getRegisteredMeals()
      this.registeredMeals = [...data]

      this.isLoading = false
    },
    autoLoginUser(user: { uid: string }) {
      this.user = new User(user.uid)
      if (user) {
        this.fetchProducts()
        this.fetchRegisteredMeals()
        this.fetchChars()
      }
    },
    addProductToChoosen(payload: Product) {
      this.choosenProducts.push({
        ...payload,
        amount: 100,
      })
      this.averageProdsChars()
    },
    allTotalPercentage(payload: object) {
      this.averChProdChars = { ...this.averChProdChars, percentage: payload }
    },
    updateChoosenProduct(payload: Product) {
      const choosenProducts: Product[] = [...this.choosenProducts]
      const index = choosenProducts.findIndex((item) => {
        return item.id === payload.id
      })
      choosenProducts[index].amount = payload.amount ? +payload.amount : NaN

      this.choosenProducts = [...choosenProducts]

      this.averageProdsChars()
    },
    removeProductFromChoosen(payload: string) {
      const newArr: Product[] = this.choosenProducts.filter(
        (el) => el.id !== payload
      )
      this.choosenProducts = [...newArr]

      this.averageProdsChars()

      if (newArr.length === 0) this.clearChoosenProducts()
    },
    averageProdsChars() {
      if (this.choosenProducts.length === 0) return {}

      const listOfProductsWithAverage = []
      const chars = {}

      for (const product of this.choosenProducts) {
        let currProductChars: {
          foodEnergy: any[]
          macroMicro: any[]
          vitamins: any[]
        } = {
          foodEnergy: [],
          macroMicro: [],
          vitamins: [],
        }
        for (const [key, secondItem] of Object.entries(
          product.characteristics
        )) {
          // @ts-ignore
          currProductChars[key] = []
          for (let item of secondItem) {
            let versions = item.versions
            // @ts-ignore
            currProductChars[key].push({
              title: item.title,
              // @ts-ignore
              versions: [{ value: (average(versions) * product.amount) / 100 }],
            })
          }
        }
        listOfProductsWithAverage.push(currProductChars)
      }

      for (const [key, item] of Object.entries(listOfProductsWithAverage[0])) {
        // @ts-ignore
        chars[key] = []
        for (const productItem of listOfProductsWithAverage) {
          // @ts-ignore
          for (let innerItem of productItem[key]) {
            // @ts-ignore
            let foundParam = chars[key].find(
              // @ts-ignore
              (el) => el.title === innerItem.title
            )
            if (foundParam) {
              foundParam.versions.push({ value: innerItem.versions[0].value })
            } else {
              // @ts-ignore
              chars[key].push({
                title: innerItem.title,
                versions: [...innerItem.versions],
              })
            }
          }
          const resultOfItemsInCat = []
          // @ts-ignore
          for (const item of chars[key]) {
            const averageOfParam = {
              title: item.title,
              versions: [{ value: summOfValueOfArray(item.versions, 'value') }],
            }
            resultOfItemsInCat.push(averageOfParam)
          }
          // @ts-ignore
          chars[key] = [...resultOfItemsInCat]
        }
      }

      this.averChProdChars = { ...chars }
    },
    clearChoosenProducts() {
      this.choosenProducts = []
      this.averChProdChars = {}
      this.averageProdsChars()
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

          this.fetchChars()

          resolve(userCredential)
        } catch (error: any) {
          console.log('[loginUser] ERROR:', error)

          this.isLoading = false
          this.error = error.message

          reject(error)
        }
      })
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
          console.log('[createUserWithEmailAndPassword] ERROR:', error)

          this.error = error.message
          this.isLoading = false

          reject(error)
        }
      })
    },

    async fetchChars() {
      const userId = this.user?.id
      const link = 'profile/' + userId
      const res = fetch(link)

      res
        .then((data) => {
          console.log('data:', data)
          this.userChars = { ...data }
        })
        .catch((error) => console.log('[fetchChars] ERROR:', error))
    },
    async updateUserChars(data: any[]) {
      const userId = this.user?.id
      const link = '/profile/' + userId

      const res = patch(link, data)
      res
        .then((status) => {
          // trigger success modal

          console.log('Status:', status)
        })
        .catch((error) => console.log('[updateUserChars] ERROR:', error))
    },
    logoutUser() {
      const auth = getAuth()
      signOut(auth)
      this.user = null
    },
  },
  getters: {
    getData(state) {
      return state.productsList
    },
    isUserLoggedIn(state) {
      return state.user !== null
    },
    alreadyRegisteredForCurrentDate(state) {
      return state.registeredMeals.find((el) =>
        areTwoDatesEquels(null, el.date)
      )
    },
    basicCharacteristics(state) {
      return characteristics
    },
  },
})
