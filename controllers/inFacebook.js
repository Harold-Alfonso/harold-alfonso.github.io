import { loginFacebook, providerFacebook } from '../controllers/firebase.js'

const facebook = document.getElementById('facebook')

async function logFacebook() {
  try {
    await loginFacebook(providerFacebook)
    window.location.href = '../templates/home.html'
  } catch (error) {
    console.error("Error al iniciar sesión con Facebook:", error)
  }
}

window.addEventListener('DOMContentLoaded', () => {
  facebook.addEventListener('click', logFacebook)
})
