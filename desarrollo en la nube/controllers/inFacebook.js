import {
  loginFacebook,
  userstate,
  providerFacebook,
} from '../controllers/firebase.js'

const facebook = document.getElementById('facebook')

async function logFacebook() {
  try {
    await loginFacebook(providerFacebook) // Pasa providerFacebook como argumento a loginFacebook
    await userstate()
    window.location.href = '../templates/home.html'
  } catch (error) {
    // Manejo de errores
  }
}

window.addEventListener('DOMContentLoaded', () => {
  facebook.addEventListener('click', logFacebook)
})
