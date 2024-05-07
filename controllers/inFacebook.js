import {
  loginFacebook,
  userstate,
  providerFacebook,
} from '../controllers/firebase.js'

const facebook = document.getElementById('facebook')

async function logFacebook() {
  try {
    await loginFacebook(providerFacebook)
    await userstate()
    window.location.href = '../templates/home.html'
  } catch (error) {
    console.log(error)
  }
}

window.addEventListener('DOMContentLoaded', () => {
  facebook.addEventListener('click', logFacebook)
})
