import { Getregister, setregister } from './firebase.js'

const save = document.getElementById('Sreg')

async function guarda() {
  const cod = document.getElementById('Cod').value
  const Nom = document.getElementById('Nom').value
  const cit = document.getElementById('Pais').value

  try {
    const validar = setregister(cod, Nom, cit)
    if (validar) {
      const verificar = await validar
      alert('registro exitoso')
      window.location.href = '../templates/registercities.html'
    }
  } catch (error) {
    console.error('error', e)
    alert('Register failes', error)
  }
}

async function ver() {
  const cod = document.getElementById('Cod').value
  try {
    const esperar = Getregister(cod)
    const docSnap = await esperar
    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data())
    } else {
      // docSnap.data() will be undefined in this case
      console.log('No such document!')
    }
  } catch (error) {}
}

window.addEventListener('DOMContentLoaded', async () => {
  save.addEventListener('click', guarda)
})
