// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js'
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBcECYGbM2v2MAnwMk8DVNR9wi5eghCxhU',
  authDomain: 'apiweb2024g2d-nube.firebaseapp.com',
  projectId: 'apiweb2024g2d-nube',
  storageBucket: 'apiweb2024g2d-nube.appspot.com',
  messagingSenderId: '691242887926',
  appId: '1:691242887926:web:a20f3523c224cd2a901ad7',
  measurementId: 'G-YQ5HPXJRKQ',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

// autenticacion usuario
export const loginauth = (email, password) =>
  signInWithEmailAndPassword(auth, email, password)

//cerrar sesion usuario

export const loginout = () => signOut(auth)

//estado del usuario

export function userstate() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid
      console.log(uid)
    } else {
      window.location.href = '../index.html'
    }
  })
}
