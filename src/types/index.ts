export type TElement = {
  title: string
  versions: {
    origin: string
    value: number
  }[]
}

export enum ECharacteristic {
  foodEnergy = 'foodEnergy',
  minerals = 'minerals',
  vitamins = 'vitamins',
}

export type TCharacteristics = {
  [ECharacteristic.foodEnergy]: TElement[]
  [ECharacteristic.minerals]: TElement[]
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
  amount: number
}

export type TRegisteredMeal = {
  id: string
  date: number
  percentage: number
  productsList: {
    amount: number
    id: string
    title: string
    characteristics: TCharacteristics
  }[]
}

export type TFilledDaysArray = {
  date: Date
  filled: number
}
