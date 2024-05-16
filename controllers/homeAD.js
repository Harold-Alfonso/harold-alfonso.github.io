import { userstate, loginout, Deletuser } from './firebase.js'

userstate()

const sesion = document.getElementById('cerrarcesion')
const create = document.getElementById('btnNew')
const Delete = document.getElementById('btnDeleteUser')

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

async function EliminarUser() {
  const verificacion = Deletuser()
  const comprobar = await verificacion

    .then((comprobar) => {
      alert('Usuario elimiando')

      window.location.href = '../index.html'
    })
    .catch((error) => {
      alert('Usuario no eliminado')
    })
}

async function CrearUs() {
  window.location.href = '../templates/RegisAd.html'
}

window.addEventListener('DOMContentLoaded', async () => {
  sesion.addEventListener('click', cerrarsesion)
})

window.addEventListener('DOMContentLoaded', async () => {
  Delete.addEventListener('click', EliminarUser)
})

window.addEventListener('DOMContentLoaded', async () => {
  create.addEventListener('click', CrearUs)
})
