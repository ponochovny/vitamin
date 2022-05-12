import store from '../store'
export default function (to, from, next) {
	if (store.getters.user !== null) {
		next()
	} else {
		next('/auth?loginError=true')
	}
}
