const contenedorCards = document.getElementById('pastEvents')
const contenedorchecks = document.getElementById('checkPast')
const input = document.querySelector('input')
let data

fetch('https://mindhub-xj03.onrender.com/api/amazing')
  .then((res) => res.json())
  .then((data) => {
    let currentDate = data.currentDate

    //llamo a las funciones
    crearCheckboxes(data.events, contenedorchecks)

    const arrayFilter = data.events.filter(event => event.date < currentDate)
    showCards(arrayFilter)

    //Eventos
    input.addEventListener('input', () => {
      superFiltro(arrayFilter, input.value)
    })
    contenedorchecks.addEventListener('change', () => {
      superFiltro(arrayFilter, input.value)
    })

  })
  .catch((error) => console.log(error))

eventos = fetch('/javaScript/amazing.json')
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






