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
  amount: number
}

interface Array<T> {
  find(
    predicate: (value: T, index: number, obj: Array<T>) => boolean,
    thisArg?: any
  ): T | undefined
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
} & Array<TRegisteredMeal>

export type TFilledDaysArray = {
  date: Date
  filled: number
}
