import { CrearUsuario } from '../controllers/firebase.js'

const crear = document.getElementById('registrarR')

async function registrarP() {
  const id = document.getElementById('IdentR').value
  const us = document.getElementById('Nom_usuarioR').value
  const dir = document.getElementById('DireccionR').value
  const tel = document.getElementById('telefono').value
  const RH = document.getElementById('RHR').value
  const E_civil = document.getElementById('ECR').value
  const GenR = document.getElementById('GenR').value

  const verificar = CrearUsuario(id, us, dir, tel, RH, E_civil, GenR)
  const validar = await verificar
    .then((validar) => {
      const producto = validar.producto
    })
    .catch((error) => {
      console.log(errorCode + errorMesage)
    })
}

window.addEventListener('DOMContentLoaded', async () => {
  crear.addEventListener('click', registrarP)
})
