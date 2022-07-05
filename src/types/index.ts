type Element = {
  title: string
  versions: {
    origin: string
    value: number
  }[]
}

export type Product = {
  id: string
  title: string
  uid: string
  foodEnergy: Element[]
  macroMicro: Element[]
  vitamins: Element[]
}
