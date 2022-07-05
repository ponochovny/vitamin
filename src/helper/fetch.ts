import { getDatabase, ref, child, get } from 'firebase/database'
import { Product, RegisteredMeal } from '../types'

export const fetch = async (folderName: string) => {
  try {
    const dbRef = ref(getDatabase())
    const data = await get(child(dbRef, folderName))
      .then((snapshot) => {
        if (snapshot.exists()) {
          return snapshot.val()
        } else {
          console.log('No data available')
          throw 'error: No data available'
        }
      })
      .catch((error) => {
        console.log(error)
        throw error
      })
    return data
  } catch (error: any) {
    console.log('!!! CATCHED AN ERROR:', error)
    return new Error(error)
  }
}

export const getProducts = async () => {
  const data: Product[] = await fetch('products')
  const result: Product[] = []

  Object.keys(data).forEach((key: any) => {
    result.push({
      title: data[key].title,
      characteristics: { ...data[key].characteristics },
      uid: data[key].uid,
      id: key,
    })
  })

  return result
}

export const getRegisteredMeals = async () => {
  const data: RegisteredMeal[] = await fetch('registeredMeals')
  const result: RegisteredMeal[] = []

  Object.keys(data).forEach((key: any) => {
    result.push({
      productsList: data[key].productsList,
      date: data[key].date,
      percentage: data[key].percentage,
      id: key,
    })
  })

  return result
}
