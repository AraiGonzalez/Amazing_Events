let data
fetch('https://mindhub-xj03.onrender.com/api/amazing')
    .then((res) => res.json())
    .then((data) => {
        let currentDate = data.currentDate
        const contenedorList = document.getElementById('list')
        const contenedorList2 = document.getElementById('list2')
        const contenedorList3 = document.getElementById('list3')
        const arrayFilter = data.events.filter(event => event.date < currentDate)
        const arrayFilter2 = data.events.filter(event => event.date > currentDate)
        const categories1 = filterRepeat(arrayFilter)
        const categories2 = filterRepeat(arrayFilter2)


        showTablePast(categories1, arrayFilter, contenedorList)
        showTableUpcoming(categories2, arrayFilter2, contenedorList2)
        totalStatistics(arrayFilter,contenedorList3)

    })
    .catch((error) => console.log(error))

//funcion
function totalStatistics(arrayDatos,contenedor){
    estadistica=''
    let objectMenor=''
    let objectMayor=''
    let mayorCapacity= ''
    let mayor=0
    let menor=9999999999 
    let mayorC=0
    let porcentaje = 0

 for ( object of arrayDatos) {
     porcentaje = (object.assistance*100)/object.capacity
    
    if (porcentaje > mayor ) {
        objectMayor = object
        mayor = porcentaje
 
       }
    if (porcentaje < menor) {
        objectMenor = object
        menor= porcentaje
    }
    if (object.capacity > mayorC) {
        mayorCapacity= object
       mayorC= object.capacity
    }

}
console.log(objectMayor.name)
     estadistica +=    ` <tr>
    <td class="statstrthtd" > ${objectMayor.name} ( ${Math.round(mayor)} %)</td>
    <td class="statstrthtd" > ${objectMenor.name} ( ${Math.round(menor)} %)</td>
    <td class="statstrthtd" > ${mayorCapacity.name} ( ${mayorCapacity.capacity} people) </tr>`
   
    contenedor.innerHTML = estadistica
}

function showTablePast(arrayDatos1, arrayDatos2, contenedor) {
    let evento = ''

    for (object1 of arrayDatos1) {
        let total = 0
        let porcentajeTotal = 0
        let contador = 0
        let promedioPorcentaje = 0

        for (object2 of arrayDatos2) {
            if (object2.category == object1) {
                total = total + (object2.price * object2.assistance)
                porcentajeTotal += (object2.assistance * 100) / object2.capacity
                contador += 1
         }
        }
        promedioPorcentaje = porcentajeTotal/contador

        evento += ` <tr>
    <td class="statstrthtd" > ${object1}</td>
    <td class="statstrthtd" >$ ${total}</td>
    <td class="statstrthtd" > ${Math.round(promedioPorcentaje)} % </tr>`
    }
    contenedor.innerHTML = evento
 }


function showTableUpcoming(arrayDatos1, arrayDatos2, contenedor) {
    let evento = ''

    for (object1 of arrayDatos1) {
        let total = 0
        let contador = 0
        let porcentajeTotal = 0
        let promedioPorcentaje = 0

        for (object2 of arrayDatos2) {
            if (object2.category == object1) {
                total = total + (object2.price * object2.estimate)
                porcentajeTotal += (object2.estimate * 100) / object2.capacity

                contador += 1
            }
        }
        promedioPorcentaje = porcentajeTotal/contador

        evento += ` <tr>
        <td class="statstrthtd" > ${object1}</td>
        <td class="statstrthtd" >$ ${total}</td>
        <td class="statstrthtd" >${Math.round(promedioPorcentaje)} %</td>
      </tr>`
    }
    contenedor.innerHTML = evento
}

function filterRepeat(arrayDatos) {
    let categoriesRepetidas = arrayDatos.map(elemento => elemento.category)
    let categories = new Set(categoriesRepetidas.sort((a, b) => {
        if (a > b) {
            return 1
        }
        if (a < b) {
            return -1
        }
        return 0
    }))
    return categories
}
