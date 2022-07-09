import { defineStore } from 'pinia'
import { getProducts, getRegisteredMeals } from '../helper/fetch'
import { Product, RegisteredMeal } from '../types'
import { areTwoDatesEquels, summOfValueOfArray } from '../helper'
import { characteristics } from '../constants/chars'
import { average } from '../helper/calculatePercentage'

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
  averChProdChars: {}
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
