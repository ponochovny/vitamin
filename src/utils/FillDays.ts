import { TRegisteredMeal, TFilledDaysArray } from '../types'

export default function FilledLastDays(
  count: number = 5,
  filledDays: TRegisteredMeal
): TFilledDaysArray[] {
  const result: TFilledDaysArray[] = []
  for (let i = 0; i < count; i++) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    // @ts-ignore
    const find = filledDays.find(
      // @ts-ignore
      (e) => new Date(e.date).toDateString() === d.toDateString()
    )
    result.unshift({ date: d, filled: find ? find.percentage : 0 })
  }

  return result
}
