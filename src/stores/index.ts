import { defineStore } from 'pinia'
import { getProducts, getRegisteredMeals } from '../helper/fetch'
import { Product, RegisteredMeal } from '../types'

class User {
  id: number

  constructor(id: number) {
    this.id = id
  }
}

export type RootState = {
  user: null | { id: number }
  isLoading: boolean
  productsList: Product[]
  registeredMeals: RegisteredMeal[]
  choosenProducts: Product[]
}

export const useMainStore = defineStore({
  id: 'mainStore',
  state: () =>
    ({
      user: null,
      isLoading: true,
      productsList: [],
      registeredMeals: [],
      choosenProducts: [],
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
    autoLoginUser(user: any) {
      this.user = new User(user.uid)
      if (user) {
        this.fetchProducts()
        this.fetchRegisteredMeals()
      }
    },
    addProductToChoosen(payload: Product) {
      this.choosenProducts.push({
        ...payload,
      })
    },
  },
  getters: {
    getData(state) {
      return state.productsList
    },
    isUserLoggedIn(state) {
      return state.user !== null
    },
  },
})
