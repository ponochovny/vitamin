import { TRegisteredMeal, TFilledDaysArray } from '../types'

export default function FilledLastDays(
  count = 5,
  filledDays: TRegisteredMeal[]
): TFilledDaysArray[] {
  const result: TFilledDaysArray[] = []
  for (let i = 0; i < count; i++) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    const find = filledDays.find((e) => {
      console.group()
      console.log('reg meal: ' + new Date(e.date).toDateString())
      console.log('for date: ' + d.toDateString())
      console.groupEnd()
      return new Date(e.date).toDateString() === d.toDateString()
    })
    result.unshift({ date: d, filled: find ? find.percentage : 0 })
  }

  return result
}
