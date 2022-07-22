import { characteristics, values } from '../constants/chars'
import { TCharacteristics, TElement } from '../types'

export const dateObj = (timestamp: number | undefined) => {
  const thisTimestamp = timestamp ? new Date(timestamp) : new Date()

  return {
    month: thisTimestamp.getUTCMonth() + 1,
    day: thisTimestamp.getUTCDate(),
    year: thisTimestamp.getUTCFullYear(),
  }
}

export const areTwoDatesEquels = (date: null | number, date2: number) => {
  const date1 = date !== null ? date : new Date().getTime()

  const { month: month1, day: day1, year: year1 } = dateObj(date1)
  const { month: month2, day: day2, year: year2 } = dateObj(date2)

  return month1 === month2 && day1 === day2 && year1 === year2
}

export const datePrettier = (date: number) => {
  const thisDate = dateObj(date)

  const year = thisDate.year
  const month = thisDate.month < 10 ? '0' + thisDate.month : thisDate.month
  const day = thisDate.day < 10 ? '0' + thisDate.day : thisDate.day

  return `${day}.${month}.${year}`
}

export const summOfValueOfArray = (arr: any[], value: string) => {
  let summ = 0
  for (let item of arr) {
    summ += item[value]
  }
  return summ
}

export const maxAmountVersions = (chars: TCharacteristics) => {
  let maxVersionsNumber = 0

  for (const [key] of Object.entries(values)) {
    // @ts-ignore
    chars[key].forEach((item: { values: [] }) => {
      if (item.values.length > maxVersionsNumber) {
        maxVersionsNumber = item.values.length
      }
    })
  }

  return maxVersionsNumber
}

export const fullFilledChars = (userChars: TCharacteristics | null = null) => {
  const exportChars = JSON.parse(JSON.stringify(characteristics))

  for (const [key] of Object.entries(values)) {
    exportChars[key] = exportChars[key].map((item: TElement) => {
      if (userChars) {
        // @ts-ignore
        const found = userChars[key].find(
          (fItem: TElement) => fItem.title === item.title
        )

        if (found) {
          return {
            ...item,
            description: found.description,
            values: [...found.values],
          }
        }
      }

      return { ...item, values: [{ value: 0, origin: '' }] }
    })
  }

  return exportChars
}
