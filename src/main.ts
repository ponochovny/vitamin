// TODO: add plugin 'react-circular-progressbar'

import { createPinia } from 'pinia'
import { createApp, h } from 'vue'
import App from './App.vue'

import './styles.scss'
import router from './router'
import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

import Spinner from './components/Spinner/Spinner.vue'

import { useMainStore } from './stores/index'
import { useUserStore } from './stores/modules/user'

createApp({
  created() {
    if (import.meta.env.VITE_USE_MOCK_DATA === 'false') {
      console.log('...[created]')
      const firebaseConfig = {
        apiKey: import.meta.env.VITE_API_KEY,
        authDomain: `${import.meta.env.VITE_PROJECT_ID}.firebaseapp.com`,
        databaseURL: `https://${
          import.meta.env.VITE_PROJECT_ID
        }.firebaseio.com`,
        projectId: import.meta.env.VITE_PROJECT_ID,
        storageBucket: `${import.meta.env.VITE_PROJECT_ID}.appspot.com`,
        messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
        appId: import.meta.env.VITE_APP_ID,
      }
      // Initialize Firebase
      const firebaseApp = initializeApp(firebaseConfig)
      const firebaseAuth = getAuth(firebaseApp)

      onAuthStateChanged(firebaseAuth, (user) => {
        if (user) useUserStore().autoLoginUser(user)
      })
    }

    setTimeout(() => {
      useUserStore().setUserChecked()
    }, 0)
    useMainStore().fetchProducts()
  },
  render: () => h(App),
})
  .use(createPinia())
  .use(router)
  .use(Toast, {
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
    closeButton: 'button',
    icon: false,
    rtl: false,
  })
  .component('Loader', Spinner)
  .mount('#app')
