import { getDatabase, ref, child, get, update, push } from 'firebase/database'
import { deepClone } from '.'
import { TProduct, TRegisteredMeal } from '../types'

export const fetch = async (folderName: string) => {
  try {
    const dbRef = ref(getDatabase())
    const data = await get(child(dbRef, folderName))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log('data received!', folderName)
          return snapshot.val()
        } else {
          console.warn('No data available', folderName)
          throw 'error: No data available'
        }
      })
      .catch((error: any) => {
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
  const data: TProduct[] = await fetch('products')
  const result: TProduct[] = []

  Object.keys(data).forEach((key: any) => {
    result.push({
      title: data[key].title,
      characteristics: { ...data[key].characteristics },
      amount: data[key].amount,
      id: key,
    })
  })

  return result
}

export const getRegisteredMeals = async (userId: string) => {
  const data: TRegisteredMeal[] = await fetch('registeredMeals/' + userId)
  const result: TRegisteredMeal[] = []

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

export const put = async (link: string, data: any) => {
  const db = getDatabase()
  const updates: { [key: string]: any } = {}

  updates[link] = deepClone(data)
  try {
    update(ref(db), updates)
    return 202
  } catch (error: any) {
    return new Error(error)
  }
}

export const post = async (payload: any, folderPath: string) => {
  const db = getDatabase()
  // Get a key for a new Post.
  const newPostKey = push(child(ref(db), folderPath)).key

  // Write the new post's data simultaneously in the posts list and the user's post list.
  const updates: any = {}
  updates[folderPath + '/' + newPostKey] = payload

  try {
    update(ref(db), updates)
    return newPostKey
  } catch (error: any) {
    return new Error(error)
  }
}
