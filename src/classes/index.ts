import { TCharacteristics, TProduct } from '../types'

export class CProduct {
  title: string
  characteristics: TCharacteristics

  constructor(title: string, characteristics: TCharacteristics) {
    this.title = title
    this.characteristics = characteristics
  }
}

export class CRegisteredMeal {
  date: number
  percentage: number
  productsList: TProduct[]

  constructor(date: number, percentage: number, productsList: TProduct[]) {
    this.date = date
    this.percentage = percentage
    this.productsList = productsList
  }
}
