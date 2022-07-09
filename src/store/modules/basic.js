import { getDatabase, ref, update, get, child } from 'firebase/database'
import { characteristics } from '../../constants/chars'

export default {
	state: {
		userChars: null,
	},
	mutations: {
		setUserChars(state, payload) {
			state.userChars = payload
		},
	},
	actions: {
		async fetchChars({ rootState, commit }) {
			const userId = rootState.user.user.id
			try {
				const dbRef = ref(getDatabase())
				const userChars = await get(child(dbRef, 'profile/' + userId)).then(
					(snapshot) => {
						if (snapshot.exists()) {
							return snapshot.val()
						} else {
							console.log('No data available')
						}
					}
				)
				commit('setUserChars', userChars)
			} catch (error) {
				console.log(error)
				throw Error(error)
			}
		},
		async updateUserChars({ rootState }, payload) {
			const userId = rootState.user.user.id
			const db = getDatabase()
			const updates = {}

			updates['/profile/' + userId] = JSON.parse(JSON.stringify(payload))
			try {
				update(ref(db), updates)
			} catch (err) {
				console.log(error)
				throw Error(error)
			}
		},
	},
	getters: {
		basicCharacteristics(state) {
			return characteristics
		},
		userChars(state) {
			return state.userChars
		},
	},
}
