//Constantes
const contenedorCards = document.getElementById('events')
const input = document.querySelector('input')
const contenedorchecks = document.getElementById('checkConteiner')
let data

fetch('https://mindhub-xj03.onrender.com/api/amazing')
  .then((res) => res.json())
  .then((data) => {

    crearCheckboxes(data.events, contenedorchecks)
    showCards(data.events)

    input.addEventListener('input', () => {
      superFiltro(data.events, input.value)
    })
    contenedorchecks.addEventListener('change', () => {
      superFiltro(data.events, input.value)
    })
  })
  .catch((error) => console.log(error))
eventos = fetch('javaScript/amazing.json')
  .then((res) => res.json())
  .then((data) => {
    console.log("Error al acceder a internet")

    crearCheckboxes(data.events, contenedorchecks)
    showCards(data.events)

    input.addEventListener('input', () => {
      superFiltro(data.events, input.value)
    })
    contenedorchecks.addEventListener('change', () => {
      superFiltro(data.events, input.value)
    })
  })





