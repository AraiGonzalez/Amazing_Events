//constantes
const contenedorCards = document.getElementById('upcomingEvents')
const contenedorchecks = document.getElementById('checkUpcoming')
const input = document.querySelector('input')

async function obtenerEventos() {
  try {
    const respuesta = await fetch('https://mindhub-xj03.onrender.com/api/amazing')
    let data
    data = await respuesta.json()
    let currentDate = data.currentDate

    //llamo a las funciones
    crearCheckboxes(data.events, contenedorchecks)

    const arrayFilter = data.events.filter(event => event.date > currentDate)
    showCards(arrayFilter)
    //Eventos
    input.addEventListener('input', () => {
      superFiltro(arrayFilter, input.value)
    })
    contenedorchecks.addEventListener('change', () => {
      superFiltro(arrayFilter, input.value)
    })

  }
  catch (error) {

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

  }
}
obtenerEventos()



