import {
  viewdates,
  eliminarCuenta,
  eliminarDocumento,
  doc,
  getDoc,
  Db,
  actualizarDocumento,
} from '../controllers/firebase.js'

const ver = document.getElementById('vdata')

async function cargar() {
  ver.innerHTML = ''

  const docref = viewdates()
  const querySnapshot = await docref
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`)
    const userData = doc.data()
    ver.innerHTML += `
      <tr>
        <th scope="row">${userData.identificacion}</th>
        <td>${userData.nombre}</td>
        <td>${userData.direccion}</td>
        <td>${userData.RH}</td>
        <td>${userData.email}</td>
        <td>${userData.telefono}</td>
        <td>
          <button class="btn btn-danger btnDeleteUser" 
                  data-user-id="${doc.id}" 
                  data-user-email="${userData.email}">
            Eliminar Usuario
          </button>
          <button type="button" class="btn btn-secondary btnUpdateUser" 
                  data-user-id="${doc.id}">
            Actualizar Usuario
          </button>
        </td>
      </tr>
    `
  })

  document.querySelectorAll('.btnDeleteUser').forEach((button) => {
    button.addEventListener('click', async () => {
      const userEmail = button.getAttribute('data-user-email')
      const userId = button.getAttribute('data-user-id')
      const userDocRef = doc(Db, 'usuario', userId)
      const userDocSnapshot = await getDoc(userDocRef)
      const userData = userDocSnapshot.data()
      const userPassword = userData.contra

      if (userPassword) {
        if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
          try {
            await eliminarDocumento('usuario', userId)
            await eliminarCuenta(userEmail, userPassword)
            alert('Usuario eliminado exitosamente')
            cargar()
          } catch (error) {
            alert('Error al eliminar usuario')
            console.error('Error al eliminar usuario:', error)
          }
        }
      } else {
        alert('No se encontró la contraseña del usuario')
      }
    })
  })

  document.querySelectorAll('.btnUpdateUser').forEach((button) => {
    button.addEventListener('click', async () => {
      const userId = button.getAttribute('data-user-id')
      console.log('Botón de actualización clickeado. ID del usuario:', userId)
      const userDocRef = doc(Db, 'usuario', userId)
      const userDocSnapshot = await getDoc(userDocRef)
      const userData = userDocSnapshot.data()

      document.getElementById('updateId').value = userId
      document.getElementById('updateNombre').value = userData.nombre
      document.getElementById('updateDireccion').value = userData.direccion
      document.getElementById('updateRH').value = userData.RH
      document.getElementById('updateEmail').value = userData.email
      document.getElementById('updateTelefono').value = userData.telefono

      $('#updateModal').modal('show')
    })
  })
}

document
  .getElementById('updateUserForm')
  .addEventListener('submit', async (event) => {
    event.preventDefault()

    const userId = document.getElementById('updateId').value
    const nombre = document.getElementById('updateNombre').value
    const direccion = document.getElementById('updateDireccion').value
    const RH = document.getElementById('updateRH').value
    const email = document.getElementById('updateEmail').value
    const telefono = document.getElementById('updateTelefono').value

    const userDocRef = doc(Db, 'usuario', userId)

    try {
      await actualizarDocumento(userDocRef, {
        nombre,
        direccion,
        RH,
        email,
        telefono,
      })
      alert('Usuario actualizado exitosamente')
      $('#updateModal').modal('hide')
      cargar()
    } catch (error) {
      alert('Error al actualizar usuario')
      console.error('Error al actualizar usuario:', error)
    }
  })

window.addEventListener('DOMContentLoaded', async () => {
  cargar()
})
