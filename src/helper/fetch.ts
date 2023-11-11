import { getDatabase, ref, child, get, update, push } from 'firebase/database'
import { deepClone } from '.'
import { TProduct, TRegisteredMeal } from '../types'

export const fetch = async (folderName: string) => {
  try {
    const dbRef = ref(getDatabase())
    const data = await get(child(dbRef, folderName))
      .then((snapshot) => {
        if (snapshot.exists()) {
          // console.log('[fetch] data', folderName)
          return snapshot.val()
        } else {
          // console.warn('[fetch] no data', folderName)
          throw 'error: No data available'
        }
      })
      .catch((error: any) => {
        // console.log(error)
        throw error
      })
    return data
  } catch (error: any) {
    // console.log('!!! CATCHED AN ERROR:', error)
    throw new Error(error)
  }
}

export const getProducts = async () => {
  // console.log('[LOGGER] getProducts')

  try {
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
  } catch (error: any) {
    // console.log('double error', error)
    throw new Error(error)
  }
}

export const getRegisteredMeals = async (userId: string) => {
  // console.log('[LOGGER] getRegisteredMeals 1')

  try {
    const data: TRegisteredMeal[] = await fetch('registeredMeals/' + userId)
    const result: TRegisteredMeal[] = []

    Object.keys(data).forEach((key: any) => {
      const { productsList, date, percentage } = data[key]

      result.push({
        productsList,
        date,
        percentage,
        id: key,
      })
    })

    return result
  } catch (error) {
    // console.log('double error', error)
  }
}

export const getUserChars = async (userId: string) => {
  // debugger
  // console.log('[LOGGER] getUserChars')

  try {
    const data: TRegisteredMeal[] = await fetch('profile/' + userId)

    // console.log('data', data)
    // const result: TRegisteredMeal[] = []

    // Object.keys(data).forEach((key: any) => {
    //   const { productsList, date, percentage } = data[key]

    //   result.push({
    //     productsList,
    //     date,
    //     percentage,
    //     id: key,
    //   })
    // })

    // return result
  } catch (error: any) {
    // console.log('getUserChars error', error)
    throw new Error(error)
  }
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
