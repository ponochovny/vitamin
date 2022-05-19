import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
} from 'firebase/auth'

class User {
	constructor(id) {
		this.id = id
	}
}

export default {
	state: {
		user: null,
	},
	mutations: {
		setUser(state, payload) {
			state.user = payload
		},
	},
	actions: {
		async registerUser({ commit }, { email, password }) {
			console.log('registerUser...')
			const auth = getAuth()
			commit('clearError')
			commit('setLoading', true)
			try {
				console.log('...use1')

				createUserWithEmailAndPassword(auth, email, password)
					.then((userCredential) => {
						const user = userCredential.user
						commit('setUser', new User(user.uid))
						commit('setLoading', false)
					})
					.catch((error) => console.log(error))

				console.log('...use2')
			} catch (error) {
				commit('setLoading', false)
				commit('setError', error.message)
				throw error
			}
		},

		async loginUser({ commit }, { email, password }) {
			const auth = getAuth()
			commit('clearError')
			commit('setLoading', true)

			const promise = new Promise((resolve, reject) => {
				signInWithEmailAndPassword(auth, email, password)
					.then((userCredential) => {
						console.log('... userCredential', userCredential)

						const user = userCredential.user
						commit('setUser', new User(user.uid))
						commit('setLoading', false)

						resolve(userCredential)
					})
					.catch((error) => {
						console.log('... error', error)

						commit('setLoading', false)
						commit('setError', error.message)

						reject(error)
					})
			})

			return promise

			// try {
			// 	signInWithEmailAndPassword(auth, email, password)
			// 		.then((userCredential) => {
			// 			const user = userCredential.user
			// 			commit('setUser', new User(user.uid))
			// 			commit('setLoading', false)
			// 		})
			// 		.catch((error) => console.log(error))
			// } catch (error) {
			// 	commit('setLoading', false)
			// 	commit('setError', error.message)
			// 	throw error
			// }
		},

		async setUser({ commit, dispatch }, payload) {
			await commit('setUser', payload)
			if (payload) {
				dispatch('fetchProducts')
				dispatch('fetchRegisteredMeals')
			}
		},

		autoLoginUser({ dispatch }, payload) {
			dispatch('setUser', new User(payload.uid))
		},
		logoutUser({ dispatch }) {
			const auth = getAuth()
			signOut(auth)
			dispatch('setUser', null)
		},
	},
	getters: {
		user(state) {
			return state.user
		},
		isUserLoggedIn(state) {
			return state.user !== null
		},
	},
}
