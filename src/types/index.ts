type Element = {
  title: string
  versions: {
    origin: string
    value: number
  }[]
}

type Characteristics = {
  foodEnergy: Element[]
  macroMicro: Element[]
  vitamins: Element[]
}

export type Product = {
  id: string
  title: string
  uid: string
  characteristics: Characteristics
  amount?: number
}

export type RegisteredMeal = {
  id: string
  date: number
  percentage: number
  productsList: {
    amount: number
    id: string
    title: string
    uid: string
    characteristics: Characteristics
  }[]
}
