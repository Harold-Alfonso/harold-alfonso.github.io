import { registerAuth, mensajeA } from '../controllers/firebase.js'

const specialCharacters = /[!@#$%^&*(),.?":{}|<>]/
const uppercaseLetter = /[A-Z]/
const registrar = document.getElementById('registrarR')

async function registro() {
  const email = document.getElementById('usuarioR').value
  const Cemail = document.getElementById('usuarioCo').value
  const password = document.getElementById('contraseñaR').value
  const Cpassword = document.getElementById('contraseñaCo').value

  if (password.length < 8) {
    alert('La contraseña debe tener al menos 8 caracteres')
    return
  } else if (!specialCharacters.test(password)) {
    alert('La contraseña debe contener al menos un caracter especial')
    return
  } else if (!uppercaseLetter.test(password)) {
    alert('La contraseña debe contener al menos una letra mayúscula')
    return
  } else if (email != Cemail) {
    alert('El usuario y la confirmación de usuario no coinciden')
    return
  } else if (password != Cpassword) {
    alert('La contraseña y la confirmación de contraseña no coinciden')
    return
  } else {
    const validar = registerAuth(email, password)
    const verificar = await validar
      .then((verificar) => {
        alert('Usuario registrado exitosamente')

        mensajeA()
          .then(() => {
            console.log('Correo electrónico de verificación enviado con éxito')
          })
          .catch((error) => {
            console.error(
              'Error al enviar correo electrónico de verificación:',
              error
            )
          })
        window.location.href = '../index.html'
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        alert(errorMessage)
      })
  }
}

window.addEventListener('DOMContentLoaded', () => {
  registrar.addEventListener('click', registro)
})
