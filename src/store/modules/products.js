import {
	getDatabase,
	ref,
	child,
	get,
	update,
	push,
	set,
} from 'firebase/database'

class Product {
	constructor(title, characteristics, uid) {
		this.title = title
		this.characteristics = characteristics
		this.uid = uid
	}
}
class RegisteredMeal {
	constructor(date, percentage, productsList) {
		this.date = date
		this.percentage = percentage
		this.productsList = productsList
	}
}

export default {
	state: {
		registeredMeals: [],

		products: [],
		choosenProducts: [],
		averChProdChars: {},
	},
	mutations: {
		loadProducts(state, payload) {
			state.products = payload
		},
		loadRegisteredMeals(state, payload) {
			state.registeredMeals = payload
		},
		createProduct(state, payload) {
			state.products.push(payload)
		},
		updateProduct(state, { title, id }) {
			const product = state.products.find((a) => {
				return a.id === id
			})
			product.title = title
		},
		registerMeal(state, payload) {
			state.registeredMeals.push(payload)
		},
		updateRegisteredMeal(state, payload) {
			const index = state.registeredMeals.findIndex((el) => {
				return el.id === payload.id
			})
			state.registeredMeals[index].productsList = payload.productsList
		},
		addProductToChoosen(state, payload) {
			state.choosenProducts.push({
				...payload,
			})
		},
		updateChoosenProduct(state, payload) {
			const choosenProducts = [...state.choosenProducts]
			const index = choosenProducts.findIndex((item) => {
				return item.id === payload.id
			})
			choosenProducts[index].amount = +payload.amount

			state.choosenProducts = [...choosenProducts]
		},
		averageProdsChars(state) {
			if (state.choosenProducts.length === 0) return {}

			const listOfProductsWithAverage = []
			const chars = {}

			const average = (arr) => {
				let counter = 0
				let summ = 0
				for (let item of arr) {
					counter++
					summ += item.value
				}
				return summ / counter
			}
			const summ = (arr) => {
				let summ = 0
				for (let item of arr) {
					summ += item.value
				}
				return summ
			}

			for (const product of state.choosenProducts) {
				let currProductChars = {}
				for (const [key, secondItem] of Object.entries(
					product.characteristics
				)) {
					currProductChars[key] = []
					for (let item of secondItem) {
						let versions = item.versions
						currProductChars[key].push({
							title: item.title,
							versions: [{ value: (average(versions) * product.amount) / 100 }],
						})
					}
				}
				listOfProductsWithAverage.push(currProductChars)
			}

			for (const [key, item] of Object.entries(listOfProductsWithAverage[0])) {
				chars[key] = []
				for (const productItem of listOfProductsWithAverage) {
					for (let innerItem of productItem[key]) {
						let foundParam = chars[key].find(
							(el) => el.title === innerItem.title
						)
						if (foundParam) {
							foundParam.versions.push({ value: innerItem.versions[0].value })
						} else {
							chars[key].push({
								title: innerItem.title,
								versions: [...innerItem.versions],
							})
						}
					}
					const resultOfItemsInCat = []
					for (const item of chars[key]) {
						const averageOfParam = {
							title: item.title,
							versions: [{ value: summ(item.versions) }],
						}
						resultOfItemsInCat.push(averageOfParam)
					}
					chars[key] = [...resultOfItemsInCat]
				}
			}

			state.averChProdChars = { ...chars }
		},
		allTotalPercentage(state, payload) {
			state.averChProdChars = { ...state.averChProdChars, percentage: payload }
		},
		clearChoosenProducts(state) {
			state.choosenProducts = []
			state.averChProdChars = {}
		},
		removeProductFromChoosen(state, payload) {
			const newArr = state.choosenProducts.filter((el) => el.id !== payload)
			state.choosenProducts = [...newArr]
		},
	},
	actions: {
		async createProduct({ commit, getters }, payload) {
			commit('clearError')
			commit('setLoading', true)
			try {
				const db = getDatabase()
				// Get a key for a new Post.
				const newPostKey = push(child(ref(db), 'products')).key

				const newProduct = new Product(
					payload.title,
					payload.characteristics,
					getters.user.id
				)

				// Write the new post's data simultaneously in the posts list and the user's post list.
				const updates = {}
				updates['/products/' + newPostKey] = newProduct
				update(ref(db), updates)

				commit('setLoading', false)
				commit('createProduct', {
					...newProduct,
					id: newPostKey,
				})
			} catch (error) {
				commit('setError', error.message)
				commit('setLoading', false)
				throw error
			}
		},
		async updateProduct({ commit }, { title, characteristics, id }) {
			commit('clearError')
			commit('setLoading', true)
			try {
				await database.ref('products').child(id).update({
					title,
					characteristics,
				})
				commit('updateProduct', {
					title,
					characteristics,
					id,
				})
				commit('setLoading', false)
			} catch (error) {
				commit('setError', error.message)
				commit('setLoading', false)
				throw error
			}
		},
		async updateRegisteredMeal({ commit, state, getters }) {
			commit('clearError')
			commit('setLoading', true)

			const curDateItem = {
				...JSON.parse(JSON.stringify(getters.alreadyRegisteredForCurrentDate)),
			}
			const choosenProducts = state.choosenProducts
			const dbRef = ref(getDatabase())

			try {
				// ... calculate summ
				let newProductsList = curDateItem.productsList.map((el) => {
					const found = choosenProducts.find((innerEl) => innerEl.id === el.id)

					if (found) {
						// remove this element from origin array
						const index = choosenProducts.indexOf(found)
						choosenProducts.splice(index, 1)
						// ...

						return {
							...el,
							amount: +el.amount + +found.amount,
						}
					}

					return el
				})
				newProductsList = [...newProductsList, ...choosenProducts]
				// ...

				const updates = {}
				updates['/registeredMeals/' + curDateItem.id] = {
					...curDateItem,
					productsList: newProductsList,
				}
				update(dbRef, updates)

				// // UPDATE LOCALLY
				commit('updateRegisteredMeal', {
					id: curDateItem.id,
					productsList: newProductsList,
				})

				commit('setLoading', false)
			} catch (error) {
				commit('setError', error.message)
				commit('setLoading', false)
				throw error
			}
		},
		async registerMeal({ commit, state }) {
			const date = new Date()
			const db = getDatabase()

			commit('clearError')
			commit('setLoading', true)

			const newProduct = new RegisteredMeal(
				date.valueOf(),
				state.averChProdChars.percentage,
				state.choosenProducts
			)

			try {
				const registeredMealsListRef = ref(db, 'registeredMeals')
				const newRegisteredMealKey = push(registeredMealsListRef)
				set(newRegisteredMealKey, newProduct)

				commit('registerMeal', {
					date: newProduct.date,
					productsList: newProduct.choosenProducts,
					percentage: newProduct.percentage,
					id: newRegisteredMealKey,
				})
				commit('clearError')
				commit('setLoading', false)
			} catch (error) {
				commit('setError', error.message)
				commit('setLoading', false)
				throw error
			}
		},
		async fetchProducts({ commit, getters }) {
			if (!getters.isUser) return

			commit('clearError')
			commit('setLoading', true)

			const resultProducts = []
			try {
				const dbRef = ref(getDatabase())
				const products = await get(child(dbRef, 'products'))
					.then((snapshot) => {
						if (snapshot.exists()) {
							return snapshot.val()
						} else {
							console.log('No data available')
						}
					})
					.catch((error) => console.log(error))

				Object.keys(products).forEach((key) => {
					resultProducts.push({
						title: products[key].title,
						characteristics: { ...products[key].characteristics },
						uid: products[key].uid,
						id: key,
					})
				})
				commit('loadProducts', resultProducts)
				commit('setLoading', false)
			} catch (error) {
				commit('setError', error.message)
				commit('setLoading', false)
				throw error
			}
		},
		async fetchRegisteredMeals({ commit, getters }) {
			if (!getters.isUser) return

			commit('clearError')
			commit('setLoading', true)
			const resultRegisteredMeals = []
			try {
				const dbRef = ref(getDatabase())
				const registeredMeals = await get(child(dbRef, 'registeredMeals'))
					.then((snapshot) => {
						if (snapshot.exists()) {
							return snapshot.val()
						} else {
							console.log('No data available')
						}
					})
					.catch((error) => {
						if (error.message === 'Permission denied') {
							console.log('!> User is not logged in to get registered meals')
						} else {
							console.log(error)
						}
					})

				registeredMeals &&
					Object.keys(registeredMeals).forEach((key) => {
						resultRegisteredMeals.push({
							productsList: registeredMeals[key].productsList,
							date: registeredMeals[key].date,
							percentage: registeredMeals[key].percentage,
							id: key,
						})
					})

				commit('loadRegisteredMeals', resultRegisteredMeals)
				commit('setLoading', false)
			} catch (error) {
				commit('setError', error.message)
				commit('setLoading', false)
				throw error
			}
		},

		allTotalPercentage({ commit }, payload) {
			commit('allTotalPercentage', payload)
		},

		addProductToChoosen({ commit }, payload) {
			commit('addProductToChoosen', { ...payload, amount: 100 })
			commit('averageProdsChars')
		},
		updateChoosenProduct({ commit }, payload) {
			commit('updateChoosenProduct', payload)
			commit('averageProdsChars')
		},
		clearChoosenProducts({ commit }) {
			commit('clearChoosenProducts')
			commit('averageProdsChars')
		},
		removeProductFromChoosen({ commit, state }, payload) {
			commit('removeProductFromChoosen', payload)
			commit('averageProdsChars')
			let newArr = state.choosenProducts.filter((el) => el.id !== payload)
			if (newArr.length === 0) {
				commit('clearChoosenProducts')
			}
		},
	},
	getters: {
		isUser(_, _2, rootState) {
			return rootState.user
		},
		products(state) {
			return state.products
		},
		registeredMeals(state) {
			return state.registeredMeals
		},
		choosenProducts(state) {
			return state.choosenProducts
		},
		averageChoosenProductsChars(state) {
			return state.averChProdChars
		},
		alreadyRegisteredForCurrentDate(state) {
			const found = state.registeredMeals.find((el) => {
				const dateObj = new Date(el.date)
				const dateObjNow = new Date()

				const month = dateObj.getUTCMonth() + 1 //months from 1-12
				const day = dateObj.getUTCDate()
				const year = dateObj.getUTCFullYear()

				const monthNow = dateObjNow.getUTCMonth() + 1 //months from 1-12
				const dayNow = dateObjNow.getUTCDate()
				const yearNow = dateObjNow.getUTCFullYear()

				return month === monthNow && day === dayNow && year === yearNow
			})

			return found
		},
	},
}
