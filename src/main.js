import { createApp, h } from 'vue'

import App from './App.vue'
import './styles.scss'
import store from './store'
import router from './router'

// import moment from 'vue-moment'
import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged } from "firebase/auth"
// import Toasted from 'vue-toasted'
import Spinner from './Components/Spinner/Spinner.vue'

// const app = createApp(App)
const app = createApp({
  created() {
    const firebaseConfig = {
      apiKey: "AIzaSyD3Yp8HeC90zt5GIGQ1_4xInpQLdzE_e-g",
      authDomain: "vitamin-ebb2c.firebaseapp.com",
      databaseURL: "https://vitamin-ebb2c.firebaseio.com",
      projectId: "vitamin-ebb2c",
      storageBucket: "vitamin-ebb2c.appspot.com",
      messagingSenderId: "572356425545",
      appId: "1:572356425545:web:e606d7e159a540f4ed0c98"
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
    ,
  
    this.$store.dispatch('fetchProducts')
    this.$store.dispatch('fetchRegisteredMeals')
  },
  render: () => h(App)
})

app.use(store);
app.use(router);

// app.use(moment);
// app.use(Toasted, {position: 'bottom-center', keepOnHover: true, duration: 4500})
app.component('Loader', Spinner)

app.mount('#app')