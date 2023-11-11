import { initializeApp } from 'firebase/app'
import { firebaseConfig } from '../../core/cfg'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useUserStore } from '../../stores/modules/user'

const firebaseConfigData = firebaseConfig()
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfigData)
const firebaseAuth = getAuth(firebaseApp)

export const initializeFirebaseFlow = () => {
  onAuthStateChanged(firebaseAuth, (user) => {
    if (user) {
      useUserStore().setUser(user)
      useUserStore().fetchUserRegData()
      useUserStore().setUserChecked(true)
    } else {
      useUserStore().setUserChecked(true)
    }
  })
}
