import { TCharacteristics } from '../types'

export class CProduct {
  title: string
  characteristics: TCharacteristics

  constructor(title: string, characteristics: TCharacteristics) {
    this.title = title
    this.characteristics = characteristics
  }
}
