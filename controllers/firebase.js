// Importa las funciones necesarias de Firebase
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

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  doc as firestoreDoc,
  getDoc as firestoreGetDoc,
  setDoc,
  updateDoc,
} from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBcECYGbM2v2MAnwMk8DVNR9wi5eghCxhU',
  authDomain: 'apiweb2024g2d-nube.firebaseapp.com',
  projectId: 'apiweb2024g2d-nube',
  storageBucket: 'apiweb2024g2d-nube.appspot.com',
  messagingSenderId: '691242887926',
  appId: '1:691242887926:web:a20f3523c224cd2a901ad7',
  measurementId: 'G-YQ5HPXJRKQ',
}

// Inicializa Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const providerGoogle = new GoogleAuthProvider()
const providerFabook = new FacebookAuthProvider()
const db = getFirestore(app)

// autenticacion usuario
export const loginauth = (email, password) =>
  signInWithEmailAndPassword(auth, email, password)

// cerrar sesion usuario
export const loginout = () => signOut(auth)

// estado del usuario
export function userstate() {
  onAuthStateChanged(auth, (user) => {
    const uid = user.uid
    console.log(uid)
    if (user) {
    } else {
      window.location.href = '../index.html'
    }
  })
}

// crar nuevo usuario
export const registerAuth = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password)

// inicio con Google
export const loginGoogle = () => signInWithPopup(auth, providerGoogle)

// mensaje de confirmacion
export const mensajeA = () => sendEmailVerification(auth.currentUser)

// mensaje de cambio de contraseña
export const cambiar = (email) => sendPasswordResetEmail(auth, email)

// inicio sesion con Facebook
export const loginFacebook = () => signInWithPopup(auth, providerFabook)
export const providerFacebook = new FacebookAuthProvider()

// eliminar usuario
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

export async function eliminarCuenta(email, password) {
  try {
    await signInWithEmailAndPassword(auth, email, password)
    const user = auth.currentUser
    await deleteUser(user)
  } catch (error) {
    console.error('Error al eliminar la cuenta:', error.message)
    alert('Error al eliminar la cuenta: ' + error.message)
  }
}

// Metodos de fireStore

// Agregar datos
export const CrearDatos = (codigo, nombre, descripcion, cantidad) => {
  addDoc(collection(db, 'users'), {
    codigo,
    nombre,
    descripcion,
    cantidad,
  })
}

// Agregar datos de usuario
export const CrearUsuario = async (
  identificacion,
  nombre,
  RH,
  direccion,
  telefono,
  email,
  contra,
  rol
) => {
  try {
    const docRef = await addDoc(collection(db, 'usuario'), {
      identificacion,
      nombre,
      RH,
      direccion,
      telefono,
      email,
      contra,
      rol,
    })
    return docRef
  } catch (error) {
    throw error
  }
}

// Leer Datos

export const viewdates = () => getDocs(collection(db, 'usuario'))

// buscar datos

export const userCollectionRef = collection(db, 'usuario')

export const q = async (email) => {
  try {
    const querySnapshot = await getDocs(
      query(userCollectionRef, where('email', '==', email))
    )
    return querySnapshot
  } catch (error) {
    throw error
  }
}

//  eliminar un documento Firestore
export const eliminarDocumento = (coleccion, idDocumento) => {
  return deleteDoc(doc(db, coleccion, idDocumento))
}

export const doc = firestoreDoc
export const getDoc = firestoreGetDoc
export const Db = getFirestore(app)

// agregar datos con ID

export const setregister = (codigo, name, country) =>
  setDoc(doc(db, 'cities', codigo), {
    codigo,
    name,
    country,
  })

// leer registro especifico

export const Getregister = (codigo) => (getDoc = doc(db, 'cities', codigo))

// actualizar documento
export const actualizarDocumento = async (docRef, data) => {
  try {
    await updateDoc(docRef, data)
    console.log('Documento actualizado exitosamente')
  } catch (error) {
    console.error('Error al actualizar el documento:', error)
    throw error
  }
}
