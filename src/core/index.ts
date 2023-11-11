import { getProducts } from '../helper/fetch'
import { productsListMock } from '../helper/mocks/products'
import { useMainStore } from '../stores'
import { TProduct } from '../types'

export const basicFetch = async () => {
  const { VITE_USE_MOCK_DATA } = import.meta.env

  if (VITE_USE_MOCK_DATA) {
    const data: TProduct[] = await new Promise((resolve) => {
      setTimeout(() => {
        resolve(productsListMock)
      }, 1500)
    })
    useMainStore().setProductsList(data)
  } else {
    getProducts().then((data: TProduct[]) =>
      useMainStore().setProductsList(data)
    )
  }
}
