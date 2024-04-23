import { loginauth } from '../controllers/firebase.js'

const caja = document.getElementById('formreg')
const boton = caja['inicio']

async function validar() {
  const email = caja['usuario'].value
  const password = caja['contraseña'].value

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

boton.addEventListener('click', (e) => {
  e.preventDefault()
  validar()
})
