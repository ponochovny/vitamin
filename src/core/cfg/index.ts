export const firebaseConfig = () => {
  const {
    VITE_API_KEY,
    VITE_PROJECT_ID,
    VITE_MESSAGING_SENDER_ID,
    VITE_APP_ID,
  } = import.meta.env
  return {
    apiKey: VITE_API_KEY,
    authDomain: `${VITE_PROJECT_ID}.firebaseapp.com`,
    databaseURL: `https://${VITE_PROJECT_ID}.firebaseio.com`,
    projectId: VITE_PROJECT_ID,
    storageBucket: `${VITE_PROJECT_ID}.appspot.com`,
    messagingSenderId: VITE_MESSAGING_SENDER_ID,
    appId: VITE_APP_ID,
  }
}
