export const average = function (array: { value: number }[]) {
  let counter = 0
  let summ = 0
  for (let item of array) {
    counter++
    summ += item.value
  }
  return summ / counter
}

const averageFromMax = function (
  arrMax: { value: number }[],
  fillArr: { value: number }[]
) {
  let fill = average(fillArr)
  let max = average(arrMax)
  const result = (fill * 100) / max
  return result.toFixed(0)
}

export const calculatedPercent = function (
  item: { versions: any[]; title: string; values: any[] },
  avgProductsChars: { versions: any[]; title: string; values: any[] }[]
) {
  let findItem: { versions: any[]; title: string; values: any[] } | undefined =
    avgProductsChars
      ? avgProductsChars.find(
          (productItem: { title: string; values: any[] }) =>
            productItem.title === item.title
        )
      : undefined
  return !findItem ? '0' : averageFromMax(item.values, findItem.versions)
}
