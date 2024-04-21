import { cambiar } from '../controllers/firebase.js'

const recover = document.getElementById('recort')
const vol = document.getElementById('volver')

async function resetear() {
  const email = document.getElementById('verCorr').value

  const verificar = cambiar(email)
  const validation = await verificar

    .then(() => {
      alert('resert password seccesfull' + email)
      window.location.href = '../copyform.html'
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      // ..
    })
}
async function volver() {
  window.location.href = '../copyform.html'
}

window.addEventListener('DOMContentLoaded', async () => {
  recover.addEventListener('click', resetear)
})

window.addEventListener('DOMContentLoaded', async () => {
  vol.addEventListener('click', volver)
})
