export const dateObj = (timestamp) => {
	const thisTimestamp = timestamp ? new Date(timestamp) : new Date()

	return {
		month: thisTimestamp.getUTCMonth() + 1,
		day: thisTimestamp.getUTCDate(),
		year: thisTimestamp.getUTCFullYear(),
	}
}
