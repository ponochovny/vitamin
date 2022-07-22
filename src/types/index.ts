export type TElement = {
  title: string
  versions: {
    origin: string
    value: number
  }[]
}

export enum ECharacteristic {
  foodEnergy = 'foodEnergy',
  macroMicro = 'macroMicro',
  vitamins = 'vitamins',
}

export type TCharacteristics = {
  [ECharacteristic.foodEnergy]: TElement[]
  [ECharacteristic.macroMicro]: TElement[]
  [ECharacteristic.vitamins]: TElement[]
}

export type TDataForNewProduct = {
  title: string
  characteristics: TCharacteristics
  source: { origin: string }[]
}

export type TProduct = {
  id: string
  title: string
  characteristics: TCharacteristics
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
    characteristics: TCharacteristics
  }[]
}
