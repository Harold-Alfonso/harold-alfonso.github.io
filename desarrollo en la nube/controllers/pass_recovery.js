import { cambiar } from '../controllers/firebase.js'

const recover = document.getElementById('recort')

async function resetear() {
  const email = document.getElementById('verCorr').value

  const verificar = cambiar(email)
  const validation = await verificar

    .then(() => {
      alert('resert password seccesfull' + email)
      window.location.href = '../templates/index.html'
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      // ..
    })
}

window.addEventListener('DOMContentLoaded', async () => {
  recover.addEventListener('click', resetear)
})
