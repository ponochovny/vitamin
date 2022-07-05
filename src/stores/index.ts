import { defineStore } from 'pinia'
import { getProducts } from '../helper/fetch'
import { Product } from '../types'

class User {
  id: number

  constructor(id: number) {
    this.id = id
  }
}

export type RootState = {
  data: Product[]
  user: null | { id: number }
}

export const useMainStore = defineStore({
  id: 'mainStore',
  state: () =>
    ({
      data: [],
      user: null,
    } as RootState),
  actions: {
    async fetchProducts() {
      const resultProducts: Product[] = await getProducts()
      this.data = [...resultProducts]
    },
    autoLoginUser(user: any) {
      this.user = new User(user.uid)
      if (user) {
        this.fetchProducts()
        // this.fetchRegisteredMeals()
      }
    },
  },
  getters: {
    getData(state) {
      return state.data
    },
  },
})
