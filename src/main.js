import Vue from 'vue'
import App from './App.vue'
import './styles.scss'
import store from './store'
import router from './router'
import firebase from 'firebase/app'
import Toasted from 'vue-toasted'
import Spinner from './Components/Spinner/Spinner'

Vue.use(require('vue-moment'));

Vue.use(Toasted, {position: 'bottom-center', keepOnHover: true, duration: 4500})

Vue.component('Loader', Spinner)

new Vue({
  el: '#app',
  router,
  store,
  created() {
    var firebaseConfig = {
      apiKey: "AIzaSyD3Yp8HeC90zt5GIGQ1_4xInpQLdzE_e-g",
      authDomain: "vitamin-ebb2c.firebaseapp.com",
      databaseURL: "https://vitamin-ebb2c.firebaseio.com",
      projectId: "vitamin-ebb2c",
      storageBucket: "vitamin-ebb2c.appspot.com",
      messagingSenderId: "572356425545",
      appId: "1:572356425545:web:e606d7e159a540f4ed0c98"
    }
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig)

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log('... Vue (created) - log in')
        this.$store.dispatch('autoLoginUser', user)
      }
    }),

    this.$store.dispatch('fetchProducts')
    this.$store.dispatch('fetchRegisteredMeals')
  },
  render: h => h(App)
})
