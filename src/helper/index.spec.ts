import { summOfValueOfArray } from '.'
import { describe, expect, test } from 'vitest'

describe('test function "summOfValueOfArray"', () => {
  test('the result is right', () => {
    expect(summOfValueOfArray([{ value: 10 }, { value: 10 }])).toBe(20)
  })
})
