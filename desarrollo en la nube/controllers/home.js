import { userstate, loginout } from '../controllers/firebase.js'

userstate()

const sesion = document.getElementById('btnlogout')

async function cerrarsesion() {
  const verificacion = loginout()
  const comprobar = await verificacion

    .then((comprobar) => {
      alert('sesion cerrada')
      window.location.href = '../index.html'
    })
    .catch((error) => {
      alert('Sesion no cerrada')
    })
}
window.addEventListener('DOMContentLoaded', async () => {
  sesion.addEventListener('click', cerrarsesion)
})
