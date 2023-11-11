// TODO: add plugin 'react-circular-progressbar'

import { createPinia } from 'pinia'
import { createApp, h } from 'vue'
import App from './App.vue'

import './styles.scss'
import router from './router'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

import Spinner from './components/Spinner/Spinner.vue'

import { initializeFirebaseFlow } from './api/firebase'
import { basicFetch } from './core'

createApp({
  created() {
    initializeFirebaseFlow()

    basicFetch()
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
