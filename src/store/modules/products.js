import { getDatabase, ref, child, get, update, push } from 'firebase/database'

class Product {
	constructor(title, characteristics, uid) {
		this.title = title
		this.characteristics = characteristics
		this.uid = uid
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
			state.registeredMeals = state.registeredMeals.map((el) => {
				if (el.id === payload.id) {
					return {
						...el,
						productsList: payload.productsList,
					}
				}

				return el
			})
		},
		addProductToChoosen(state, payload) {
			state.choosenProducts.push({
				...payload,
			})
		},
		updateChoosenProduct(state, payload) {
			let found = state.choosenProducts.find((el) => el.id === payload.id)
			found.amount = payload.amount
			state.choosenProducts = [...state.choosenProducts, ...found]
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
				console.log('... test 3')
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
		async updateRegisteredMeal({ commit, state }, { id, productList }) {
			const choosenProducts = state.choosenProducts

			commit('clearError')
			commit('setLoading', true)
			try {
				// ... calculate summ
				let newProductsList = productList.map((el) => {
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

				await database.ref('registeredMeals').child(id).update({
					productsList: newProductsList,
				})

				// UPDATE LOCALLY
				commit('updateRegisteredMeal', {
					id,
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

			commit('clearError')
			commit('setLoading', true)
			try {
				await database.ref('registeredMeals').push({
					date: date.valueOf(),
					productsList: state.choosenProducts,
					percentage: state.averChProdChars.percentage,
				})

				// In progress... Get new Registered meal ID
				const registeredMealsVal = await database
					.ref('registeredMeals')
					.once('value')
				const registeredMeals = registeredMealsVal.val()

				let foundElementId = null

				Object.keys(registeredMeals).forEach((key) => {
					if (registeredMeals[key].date === date.valueOf()) {
						foundElementId = key
					}
				})
				// ...

				commit('registerMeal', {
					date: date.valueOf(),
					productsList: state.choosenProducts,
					percentage: state.averChProdChars.percentage,
					id: foundElementId,
				})
				commit('setLoading', false)
			} catch (error) {
				console.log('... error', error)
				commit('setError', error.message)
				commit('setLoading', false)
				throw error
			}
		},
		async fetchProducts({ commit }) {
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
		async fetchRegisteredMeals({ commit }) {
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
					.catch((error) => console.log(error))

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
			const isTrue = !!state.registeredMeals.find((el) => {
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

			return isTrue
		},
	},
}
