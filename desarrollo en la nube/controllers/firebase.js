// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js'
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendEmailVerification,
  sendPasswordResetEmail,
  FacebookAuthProvider,
  deleteUser,
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
const providerGoogle = new GoogleAuthProvider()
const providerFabook = new FacebookAuthProvider()

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
      window.location.href = '../copyform.html'
    }
  })
}
//crar nuevo usuario
export const registerAuth = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password)

//inicio con Google
export const loginGoogle = () => signInWithPopup(auth, providerGoogle)

//mensaje de confirmacion

export const mensajeA = () => sendEmailVerification(auth.currentUser)

//mensaje de cambio de contraseña

export const cambiar = (email) => sendPasswordResetEmail(auth, email)

//inicio sesion con Facebook

export const loginFacebook = () => signInWithPopup(auth, providerFabook)
export const providerFacebook = new FacebookAuthProvider()

//eliminar usuario

export function Deletuser() {
  return new Promise((resolve, reject) => {
    const user = auth.currentUser
    if (user) {
      deleteUser(user)
        .then(() => {
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    } else {
      reject(new Error('No hay usuario autenticado'))
    }
  })
}
