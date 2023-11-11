export interface IChars {
  foodEnergy: FoodEnergy[]
  vitamins: Vitamin[]
  minerals: Vitamin[]
}

export interface Vitamin {
  title: string
  description: string
  values: Value[]
}

export interface FoodEnergy {
  id: string
  title: string
  description: string
  color: string
  values: Value[]
}

export interface Value {
  value: number
  origin: string
}
