import {
  viewdates,
  eliminarCuenta,
  eliminarDocumento,
  doc,
  getDoc,
  Db,
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
        </td>
      </tr>
    `
  })
  // Agregar event listener a todos los botones de eliminar usuario
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
            window.location.reload()
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
}

window.addEventListener('DOMContentLoaded', async () => {
  cargar()
})
