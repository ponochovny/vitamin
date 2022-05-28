import { createApp, h } from 'vue'

import App from './App.vue'
import './styles.scss'
import store from './store'
import router from './router'

// import moment from 'vue-moment'
import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
// import Toasted from 'vue-toasted'

import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

import Spinner from './components/Spinner/Spinner.vue'

// const app = createApp(App)
const app = createApp({
	created() {
		const firebaseConfig = {
			apiKey: import.meta.env.VITE_API_KEY,
			authDomain: `${import.meta.env.VITE_PROJECT_ID}.firebaseapp.com`,
			databaseURL: `https://${import.meta.env.VITE_PROJECT_ID}.firebaseio.com`,
			projectId: import.meta.env.VITE_PROJECT_ID,
			storageBucket: `${import.meta.env.VITE_PROJECT_ID}.appspot.com`,
			messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
			appId: import.meta.env.VITE_APP_ID,
		}
		// Initialize Firebase
		const firebaseApp = initializeApp(firebaseConfig)
		const firebaseAuth = getAuth(firebaseApp)

		onAuthStateChanged(firebaseAuth, (user) => {
			if (user) {
				console.log('... Vue (created) - log in')
				this.$store.dispatch('autoLoginUser', user)
			}
		})

		this.$store.dispatch('fetchProducts')
		this.$store.dispatch('fetchRegisteredMeals')
	},
	render: () => h(App),
})

app.use(store)
app.use(router)

app.use(Toast, {
	transition: 'Vue-Toastification__fade',
	maxToasts: 5,
	newestOnTop: true,

	position: 'bottom-center',
	timeout: 5000,
	closeOnClick: true,
	pauseOnFocusLoss: true,
	pauseOnHover: true,
	draggable: true,
	draggablePercent: 0.6,
	showCloseButtonOnHover: false,
	hideProgressBar: true,
	closeButton: false,
	icon: false,
	rtl: false,
})

// app.use(moment);
// app.use(Toasted, {position: 'bottom-center', keepOnHover: true, duration: 4500})
app.use()
app.component('Loader', Spinner)

app.mount('#app')
