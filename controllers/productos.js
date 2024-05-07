import { CrearDatos } from '../controllers/firebase.js'

const crear = document.getElementById('registrarP')

async function registrarP() {
  const codigo = document.getElementById('codigo').value
  const name = document.getElementById('nombrePro').value
  const des = document.getElementById('descripcion').value
  const cant = document.getElementById('cantidad').value

  const verificar = CrearDatos(codigo, name, des, cant)
  const validar = await verificar
    .then((validar) => {
      alert('Producto registrado')
      const producto = validar.producto
      window.location.href = '../templates/productos.html'
    })
    .catch((error) => {
      console.log(errorCode + errorMesage)
    })
}

window.addEventListener('DOMContentLoaded', async () => {
  crear.addEventListener('click', registrarP)
})
