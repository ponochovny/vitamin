const average = function (arr) {
	let counter = 0
	let summ = 0
	for (let item of arr) {
		counter++
		summ += item.value ? item.value : 0
	}
	return summ === 0 ? 0 : summ / counter
}

const averageFromMax = function (arrMax, fillArr) {
	let fill = average(fillArr)
	let max = average(arrMax)
	const result = (fill * 100) / max
	return result.toFixed(0)
}

export const calculatedPercent = function (item, avgProductsChars) {
	let findItem = avgProductsChars
		? avgProductsChars.find((productItem) => productItem.title === item.title)
		: undefined

	return !findItem ? '0' : averageFromMax(item.values, findItem.versions)
}
