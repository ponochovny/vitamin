import { TProduct } from '../../types'

const dummyProducts = [
  'Pasta',
  'Meat',
  'Chicken',
  'Apple',
  'Carrot',
  'Garlic',
  'Grechka',
  'Potato',
]

const listOfEnergy = ['Energy', 'Water', 'Protein', 'Fat', 'Carbs']
const listOfVitamins = [
  'A',
  'B1',
  'B2',
  'B4',
  'B6',
  'B12',
  'C',
  'D',
  'E',
  'K',
  'Z',
]
const listOfMinerals = ['Kalii', 'Magnii', 'Zhelezo', 'Calcii']

const generateProducts = (): TProduct[] => {
  const generateItem = (title: string) => {
    return {
      title,
      versions: [
        {
          origin: '',
          value: 100,
        },
      ],
    }
  }
  const products: TProduct[] = dummyProducts.map((p) => {
    const energyItems = listOfEnergy.map((e) => generateItem(e))
    const mineralsItems = listOfMinerals.map((m) => generateItem(m))
    const vitaminsList = listOfVitamins.map((v) => generateItem(v))

    const product = {
      id: Math.random().toString(),
      title: p,
      characteristics: {
        foodEnergy: [...energyItems],
        minerals: [...mineralsItems],
        vitamins: [...vitaminsList],
      },
      amount: 100,
    }

    return product
  })

  return products
}

export const productsListMock: TProduct[] = generateProducts()
