import { defineStore } from 'pinia'
import {
  fetch,
  getProducts,
  getRegisteredMeals,
  post,
  put,
} from '../helper/fetch'
import {
  TCharacteristics,
  TProduct,
  TRegisteredMeal,
  TDataForNewProduct,
} from '../types'
import { areTwoDatesEquels, deepClone, summOfValueOfArray } from '../helper'
import { characteristics } from '../constants/chars'
import { average } from '../helper/calculatePercentage'
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { CProduct, CRegisteredMeal } from '../classes'

class User {
  id: string

  constructor(id: string) {
    this.id = id
  }
}

export type RootState = {
  user: null | { id: string }
  userChars: null | TCharacteristics
  isUserChecked: boolean
  isLoading: boolean
  error: string | null
  productsList: TProduct[]
  registeredMeals: TRegisteredMeal[]
  choosenProducts: TProduct[]
  averChProdChars:
    | {
        charachteristics: TCharacteristics
        percentage: number
      }
    | {}
}

export const useMainStore = defineStore({
  id: 'mainStore',
  state: () =>
    ({
      user: null,
      userChars: null,
      isLoading: true,
      isUserChecked: false,
      error: null,
      productsList: [],
      registeredMeals: [],
      choosenProducts: [],
      averChProdChars: {},
    } as RootState),
  actions: {
    setUserChecked() {
      this.isUserChecked = true
    },
    async createProduct(payload: TDataForNewProduct) {
      this.error = null
      this.isLoading = true

      const newProduct = new CProduct(payload.title, payload.characteristics)

      return new Promise(async (resolve, reject) => {
        try {
          const newProductKey = await post(newProduct, 'products')
          if (typeof newProductKey === 'string') {
            this.productsList.push({
              ...newProduct,
              amount: 100,
              id: newProductKey,
            })
          }
          resolve(newProductKey)
        } catch (error: any) {
          this.error = error.message
          this.isLoading = false

          reject(error)
        }
      })
    },
    async updateProduct({
      title,
      characteristics,
      id,
    }: {
      title: string
      characteristics: TCharacteristics
      id: string
    }) {
      this.error = null
      this.isLoading = true

      const link = '/products/' + id

      try {
        put(link, { title, characteristics })

        // update local data
        const index = this.productsList.findIndex((el) => el.id === id)
        this.productsList[index].title = title

        this.isLoading = false
      } catch (error: any) {
        this.error = error.message
        this.isLoading = false
        throw error
      }
    },
    async fetchProducts() {
      this.isLoading = true

      const data: TProduct[] = await getProducts()
      this.productsList = [...data]

      this.isLoading = false
    },
    async fetchRegisteredMeals() {
      this.isLoading = true

      const data: TRegisteredMeal[] = await getRegisteredMeals(this.user?.id!)
      this.registeredMeals = [...data]

      this.isLoading = false
    },
    autoLoginUser(user: { uid: string }) {
      this.user = new User(user.uid)
      if (user) {
        this.fetchRegisteredMeals()
        this.fetchChars()
      }
    },
    addProductToChoosen(payload: TProduct) {
      this.choosenProducts.push({
        ...payload,
        amount: 100,
      })
      this.averageProdsChars()
    },
    allTotalPercentage(payload: number) {
      // @ts-ignore
      this.averChProdChars = {
        ...this.averChProdChars,
        percentage: payload,
      }
    },
    updateChoosenProduct(payload: TProduct) {
      const choosenProducts: TProduct[] = [...this.choosenProducts]
      const index = choosenProducts.findIndex((item) => {
        return item.id === payload.id
      })
      choosenProducts[index].amount = payload.amount ? +payload.amount : NaN

      this.choosenProducts = [...choosenProducts]

      this.averageProdsChars()
    },
    removeProductFromChoosen(payload: string) {
      this.choosenProducts = this.choosenProducts.filter(
        (el) => el.id !== payload
      )

      this.averageProdsChars()

      if (this.choosenProducts.length === 0) {
        this.clearChoosenProducts()
      }
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

      // @ts-ignore
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
          console.log('[createUserWithEmailAndPassword] ERROR:', error.message)

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

      put(link, data)
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

    async registerMeal() {
      const date = new Date()
      // const db = getDatabase()

      this.error = null
      this.isLoading = true

      const newProduct = new CRegisteredMeal(
        date.valueOf(),
        // @ts-ignore
        this.averChProdChars.percentage,
        this.choosenProducts
      )

      try {
        const newRegisteredMealKey = await post(
          newProduct,
          `registeredMeals/${this.user?.id}`
        )

        this.registeredMeals.push({
          date: newProduct.date,
          productsList: newProduct.productsList,
          percentage: newProduct.percentage,
          id:
            typeof newRegisteredMealKey === 'string'
              ? newRegisteredMealKey
              : 'undefined',
        })

        this.clearChoosenProducts()

        this.error = null
        this.isLoading = false
      } catch (error: any) {
        this.error = error.message
        this.isLoading = false
        throw error
      }
    },
    async updateRegisteredMeal() {
      if (!this.alreadyRegisteredForCurrentDate) return
      this.error = null
      this.isLoading = true

      const curDateItem: TRegisteredMeal = deepClone(
        this.alreadyRegisteredForCurrentDate
      )
      const choosenProducts: TProduct[] = deepClone(this.choosenProducts)

      // ... calculate summ
      // @ts-ignore
      let newProductsList = [
        ...curDateItem.productsList.map((el) => {
          const found = choosenProducts.find((innerEl) => innerEl.id === el.id)

          if (found) {
            // remove this element from origin array
            const index = choosenProducts.indexOf(found)
            choosenProducts.splice(index, 1)
            // ...

            return {
              ...el,
              amount: +el.amount + +found.amount!,
            }
          }

          return el
        }),
        ...deepClone(choosenProducts),
      ]

      try {
        put(
          `registeredMeals/${this.user?.id}/${this.alreadyRegisteredForCurrentDate.id}`,
          {
            ...deepClone(this.alreadyRegisteredForCurrentDate),
            productsList: newProductsList,
          }
        )

        // UPDATE LOCALLY
        const index = this.registeredMeals.findIndex((el) => {
          return el.id === this.alreadyRegisteredForCurrentDate!.id
        })
        this.registeredMeals[index].productsList = newProductsList

        this.clearChoosenProducts()

        this.isLoading = false
      } catch (error: any) {
        this.error = error.message
        this.isLoading = false

        throw error
      }
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
