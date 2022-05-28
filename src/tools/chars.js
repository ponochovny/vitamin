import { values, characteristics } from '../constants/chars'

export const maxAmountVersions = (chars) => {
	let maxVersionsNumber = 0

	for (const [key] of Object.entries(values)) {
		chars[key].forEach((item) => {
			if (item.values.length > maxVersionsNumber) {
				maxVersionsNumber = item.values.length
			}
		})
	}

	return maxVersionsNumber
}

export const fullFilledChars = (userChars = null) => {
	const exportChars = JSON.parse(JSON.stringify(characteristics))

	for (const [key] of Object.entries(values)) {
		exportChars[key] = exportChars[key].map((item) => {
			if (userChars) {
				const found = userChars[key].find((fItem) => fItem.title === item.title)

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
