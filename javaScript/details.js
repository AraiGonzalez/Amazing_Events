const containerCards = document.getElementById("cardsContainerD");
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const place = document.getElementById('place');

console.log("Query String:", queryString);
console.log("ID:", id);

let data;

// Intentar acceder a la API
fetch('https://mindhub-xj03.onrender.com/api/amazing')
  .then((res) => {
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  })
  .then((data) => {
    console.log("Data from API:", data);
    mostrarDetails(data);
  })
  .catch((error) => {
    console.log("Error accessing API, using local JSON:", error);
    // Si falla, usar el archivo JSON local
    fetch('javaScript/amazing.json')
      .then((res) => res.json())
      .then((data) => {
        console.log("Data from local JSON:", data);
        mostrarDetails(data);
      })
      .catch((error) => console.log("Error accessing local JSON:", error));
  });

function mostrarDetails(arrayDatos) {
  const data1 = arrayDatos.events.find(cards => cards._id == id);
  console.log("Event Data:", data1);
  if (data1) {
    containerCards.innerHTML += ` 
      <div class="card mb-3 " style="max-width: 100%;">
        <div class="row g-0">
          <div class="col-md-5 colorCard">
            <img src="${data1.image}" class="img-fluid imgDetails" alt="...">
          </div>
          <div class="col-md-7 colorCard">
            <div class="card-body ">
              <h5 class="card-title">${data1.name}</h5>
              <p class="card-text">Description: ${data1.description}</p>
              <p class="card-text">  <i id="place" class="bi bi-geo-alt-fill"></i> ${data1.place}&emsp; <i class="bi bi-calendar-day-fill"></i> ${data1.date} &emsp; <i class="bi bi-cash-coin"></i> $ ${data1.price} </p>
            </div>
          </div>
        </div>
      </div> `;
  } else {
    console.log("No event found with the given ID.");
  }
}