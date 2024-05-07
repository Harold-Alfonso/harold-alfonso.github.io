import {
  registerAuth,
  mensajeA,
  CrearUsuario,
} from '../controllers/firebase.js'

const specialCharacters = /[!@#$%^&*(),.?":{}|<>]/
const uppercaseLetter = /[A-Z]/
const registrar = document.getElementById('registrarR')

async function registro() {
  const id = document.getElementById('IdentR').value
  const us = document.getElementById('Nom_usuarioR').value
  const dir = document.getElementById('DireccionR').value
  const tel = document.getElementById('telefono').value
  const RH = document.getElementById('RHR').value
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
    const validar = async () => {
      try {
        await registerAuth(email, password)
      } catch (error) {
        throw error
      }
    }
    const datos = async () => {
      try {
        return await CrearUsuario(id, us, RH, dir, tel)
      } catch (error) {
        throw error
      }
    }

    try {
      await validar()
      const docRef = await datos()
      if (docRef.id) {
        alert('Usuario registrado exitosamente')
        await mensajeA()
        console.log('Correo electrónico de verificación enviado con éxito')
        window.location.href = '../index.html'
      } else {
        alert('Error al registrar usuario')
      }
    } catch (error) {
      console.error(error)
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  registrar.addEventListener('click', registro)
})
