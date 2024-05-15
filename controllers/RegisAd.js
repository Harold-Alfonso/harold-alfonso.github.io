import {
  registerAuth,
  mensajeA,
  CrearUsuario,
} from '../controllers/firebase.js'

const specialCharacters = /[!@#$%^&*(),.?":{}|<>]/
const uppercaseLetter = /[A-Z]/
const registrar = document.getElementById('Sregis')
const voli = document.getElementById('volverA')

async function registro() {
  const id = document.getElementById('IdentRDS').value
  const us = document.getElementById('Nom_usuarioRDS').value
  const dir = document.getElementById('DireccionRDS').value
  const tel = document.getElementById('telefonoDS').value
  const RH = document.getElementById('RHRDS').value
  const Rol = document.getElementById('RolDS').value
  const email = document.getElementById('usuarioRDS').value
  const Cemail = document.getElementById('usuarioCoDS').value
  const password = document.getElementById('contraseñaRDS').value
  const Cpassword = document.getElementById('contraseñaCoDS').value

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
        return await CrearUsuario(id, us, RH, dir, tel, Cemail, Rol)
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
        window.location.href = '../templates/home.html'
      } else {
        alert('Error al registrar usuario')
      }
    } catch (error) {
      console.error(error)
    }
  }
}
async function volver() {
  window.location.href = '../templates/home.html'
}

window.addEventListener('DOMContentLoaded', () => {
  registrar.addEventListener('click', registro)
})

window.addEventListener('DOMContentLoaded', async () => {
  voli.addEventListener('click', volver)
})
