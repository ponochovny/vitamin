import firebase from 'firebase'

class Product {
    constructor (title, characteristics, uid) {
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
        averChProdChars: {}
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
        updateProduct (state, {title, id}) {
            const product = state.products.find(a => {
                return a.id === id
            })
            product.title = title
        },
        registerMeal (state, payload) {
            state.registeredMeals.push(payload)
        },
        addProductToChoosen(state, payload) {
            state.choosenProducts.push(
                {
                    ...payload
                }
            )
        },
        updateChoosenProduct(state, payload) {
            let found = state.choosenProducts.find(el => el.id === payload.id)
            found.amount = payload.amount
            state.choosenProducts = [...state.choosenProducts, ...found]
        },
        averageChProdChars(state) {
            if (state.choosenProducts.length === 0) return {}

            let listOfProductsWithAverage = []
            let chars = {}

            const average = (arr) => {
                let counter = 0
                let summ = 0
                for (let item of arr) {
                    counter++
                    summ += item.value
                }
                return summ/counter
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
                for (const [key, secondItem] of Object.entries(product.characteristics)) {
                    currProductChars[key] = []
                    for (let item of secondItem) {
                        let versions = item.versions
                        currProductChars[key].push(
                            {
                                title: item.title,
                                versions: [
                                    {'value': (average(versions) * product.amount)/100}
                                ]
                            }
                        )
                    }
                }
                listOfProductsWithAverage.push(currProductChars)
            }
            for (const [key, item] of Object.entries(listOfProductsWithAverage[0])) {
                chars[key] = []
                for (const productItem of listOfProductsWithAverage) {
                    for (let innerItem of productItem[key]) {
                        let foundParam = chars[key].find(el => el.title === innerItem.title)
                        if (foundParam) {
                            foundParam.versions.push({value: innerItem.versions[0].value})
                        } else {
                            chars[key].push({
                                title: innerItem.title,
                                versions: [...innerItem.versions]
                            })
                        }
                    }
                    const resultOfItemsInCat = []
                    for (const item of chars[key]) {
                        const averageOfParam = {title: item.title, versions: [{value: summ(item.versions)}]}
                        resultOfItemsInCat.push(averageOfParam)
                    }
                    chars[key] = [...resultOfItemsInCat]
                }
            }

            state.averChProdChars = {...chars}
        },
        clearChoosenProducts(state) {
            state.choosenProducts = []
            state.averChProdChars = {}
        },
        removeProductFromChoosen(state, payload) {
            const newArr = state.choosenProducts.filter(el => el.id !== payload)
            state.choosenProducts = [
                ...newArr
            ]
        }
    },
    actions: {
        async createProduct({commit, getters}, payload) {
            commit('clearError')
            commit('setLoading', true)
            try {
                const newProduct = new Product (
                    payload.title,
                    payload.characteristics,
                    getters.user.id,
                )

                const product = await firebase.database().ref('products').push(newProduct)
                commit('setLoading', false)
                commit('createProduct', {
                    ...newProduct,
                    id: product.key
                })
            } catch (error) {
                commit('setError', error.message)
                commit('setLoading', false)
                throw error
            }
        },
        async updateProduct ({commit}, {title, id}) {
            commit('clearError')
            commit('setLoading', true)
            try {
                await firebase.database().ref('products').child(id).update({
                    title
                })
                commit('updateProduct', {
                    title,
                    id
                })
                commit('setLoading', false)
            } catch (error) {
                commit('setError', error.message)
                commit('setLoading', false)
                throw error
            }
        },
        async registerMeal ({commit, state}) {
            const date = new Date()

            commit('clearError')
            commit('setLoading', true)
            try {
                await firebase.database().ref('registeredMeals').push({
                    date: date.valueOf(),
                    productsList: state.choosenProducts
                })
                commit('registerMeal', {
                    date: date.valueOf(),
                    productsList: state.choosenProducts
                })
                commit('setLoading', false)
            } catch (error) {
                console.log('... error', error)
                commit('setError', error.message)
                commit('setLoading', false)
                throw error
            }
        },
        async fetchProducts ({commit}) {
            commit('clearError')
            commit('setLoading', true)
            const resultProducts = []
            try {
                const productsVal = await firebase.database().ref('products').once('value')
                const products = productsVal.val()
                Object.keys(products).forEach(key => {
                    resultProducts.push(
                        {
                            title: products[key].title,
                            characteristics: {...products[key].characteristics},
                            uid: products[key].uid,
                            id: key
                        }
                    )
                })
                commit('loadProducts', resultProducts)
                commit('setLoading', false)
            } catch(error) {
                commit('setError', error.message)
                commit('setLoading', false)
                throw error
            }
        },
        async fetchRegisteredMeals ({commit}) {
            commit('clearError')
            commit('setLoading', true)
            const resultRegisteredMeals = []
            try {
                const registeredMealsVal = await firebase.database().ref('registeredMeals').once('value')
                console.log('... registeredMealsVal', registeredMealsVal)

                const registeredMeals = registeredMealsVal.val()
                console.log('... registeredMeals', registeredMeals)

                Object.keys(registeredMeals).forEach(key => {
                    resultRegisteredMeals.push(
                        {
                            productsList: registeredMeals[key],
                            date: registeredMeals[key].date,
                            id: key
                        }
                    )
                })
                console.log('... resultRegisteredMeals', resultRegisteredMeals)

                commit('loadRegisteredMeals', resultRegisteredMeals)
                commit('setLoading', false)
            } catch(error) {
                commit('setError', error.message)
                commit('setLoading', false)
                throw error
            }
        },

        addProductToChoosen({commit}, payload) {
            commit('addProductToChoosen', {...payload, amount: 100})
            commit('averageChProdChars')
        },
        updateChoosenProduct({commit}, payload) {
            commit('updateChoosenProduct', payload)
            commit('averageChProdChars')
        },
        clearChoosenProducts({commit}) {
            commit('clearChoosenProducts')
            commit('averageChProdChars')
        },
        removeProductFromChoosen({commit, state}, payload) {
            commit('removeProductFromChoosen', payload)
            commit('averageChProdChars')
            let newArr = state.choosenProducts.filter(el => el.id !== payload)
            if (newArr.length === 0) {
                commit('clearChoosenProducts')
            }
        }
    },
    getters: {
        products(state) {
            return state.products
        },
        choosenProducts(state) {
            return state.choosenProducts
        },
        averageChoosenProductsChars(state) {
            return state.averChProdChars
        }
    }
}