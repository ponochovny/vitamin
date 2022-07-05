import { getDatabase, ref, child, get } from 'firebase/database'

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
  const data = await fetch('products')
  const resultProducts: any[] = []

  Object.keys(data).forEach((key) => {
    resultProducts.push({
      title: data[key].title,
      characteristics: { ...data[key].characteristics },
      uid: data[key].uid,
      id: key,
    })
  })

  return resultProducts
}
