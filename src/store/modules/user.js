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
			try {
				signInWithEmailAndPassword(auth, email, password)
					.then((userCredential) => {
						const user = userCredential.user
						commit('setUser', new User(user.uid))
						commit('setLoading', false)
					})
					.catch((error) => console.log(error))
			} catch (error) {
				commit('setLoading', false)
				commit('setError', error.message)
				throw error
			}
		},

		autoLoginUser({ commit }, payload) {
			console.log('... user info:', payload)
			commit('setUser', new User(payload.uid))
		},
		logoutUser({ commit }) {
			const auth = getAuth()
			signOut(auth)
			commit('setUser', null)
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
