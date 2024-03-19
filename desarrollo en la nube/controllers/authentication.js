import { loginauth } from '../controllers/firebase.js'

const recibir = document.getElementById('inicio')

async function validar() {
  const email = document.getElementById('usuario').value
  const password = document.getElementById('contraseña').value

  const verificar = loginauth(email, password)
  const validation = await verificar

  if (validation != null) {
    alert('user authentication seccesfull' + email)
    window.location.href = '../templates/home.html'
  } else {
    console.log('Sesion ' + email + 'not validation')
    alert('Error de usuario verifique usuario y/o contraseña')
  }
}

window.addEventListener('DOMContentLoaded', async () => {
  recibir.addEventListener('click', validar)
})
