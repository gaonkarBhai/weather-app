let place = document.getElementById("place")
let search = document.querySelector(".fa-magnifying-glass")

let getPopUp = () => {
    
}
let insertData = (data) => {
    document.getElementById("address").innerText = data.address
    document.getElementById("celcius").innerText = Math.round(((data.currentConditions.temp)-32)* .5556)
    let condition = document.querySelector(".temp-right")
    console.log(data)
    let weatherStatus = data.currentConditions.conditions
    if (weatherStatus == 'Clear') {
        condition.innerHTML = `<p>°C</p>
        <i class="fa-solid fa-cloud-sun"></i>`
    } else if (weatherStatus == 'Overcast') {
        condition.innerHTML = `<p>°C</p>
        <i class="fa-solid fa-cloud"></i>`
    }else if (weatherStatus == 'Partially cloudy') {
        condition.innerHTML = `<p>°C</p>
        <i class="fa-solid fa-cloud"></i>`
    }

    document.querySelector('.temp-min-max p').innerHTML = `Min ${Math.round(((data.days[0].tempmin) - 32) * .55)} ℃ | Max ${Math.round(((data.days[0].tempmax) - 32) * .55)} ℃`
    
    // adding data to properties
    document.querySelector('.humidity span').innerHTML = `${data.currentConditions.humidity} kg<sup>-1</sup>`
    document.querySelector('.wind span').innerHTML = `${data.days[0].windspeed} kmph`
    document.querySelector('.pressure span').innerHTML = `${data.currentConditions.pressure}Pa`
    document.querySelector('.visibility span').innerHTML = `${data.days[0].visibility}m`
    document.querySelector('.snow span').innerHTML = `${data.currentConditions.snow}`
    document.querySelector('.snow-depth span').innerHTML = `${data.currentConditions.snowdepth}`
    document.querySelector('.sun-rise span').innerHTML = `${data.currentConditions.sunrise}`
    document.querySelector('.sun-set span').innerHTML = `${data.currentConditions.sunset}`
    document.querySelector('.radition span').innerHTML = `${data.currentConditions.solarradiation} W/m <sup>2</sup>`
    document.querySelector('.energy span').innerHTML = `${data.currentConditions.solarenergy} W/m <sup>2</sup>`
    document.querySelector('.time-zone').innerHTML = `Time Zone : ${data.timezone}`
    document.querySelector('.date').innerHTML = `Date : ${data.days[0].datetime}`
    document.querySelector('.condition').innerHTML = `Condation : ${data.currentConditions.conditions}`
    document.querySelector('.desc').innerHTML = `Description : ${data.description}`

    // adding next day data
    for (let i = data.days.length-1 ; i >=0; i--){
        let div = `<div class="next-day">
                    <div class="status">
                        <span class="next-date"></span>
                        <span class="next-condition"></span>
                    </div>
                    <p></p>
                </div>`
                // document.querySelector(".next-day-update").innerHTML += div
                document.querySelector(".next-day-update .op").insertAdjacentHTML('afterend',div) 
                document.querySelector(".next-date").innerHTML = data.days[i].datetime
                document.querySelector(".next-date").innerHTML = data.days[i].datetime
                document.querySelector(".next-condition").innerHTML = data.days[i].conditions
                document.querySelector(".next-day p").innerHTML = data.days[i].description

        getPopUp()
    }
}


let getWeather = () => {
    let url

    // if user input a value 
    if (place.value) {
        url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${place.value}?key=BFQW3SUWXUPU2E9NMQZVYPD7J`
    }
    // if user didn't input a value 
    else {
        url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/india?key=BFQW3SUWXUPU2E9NMQZVYPD7J`
    }

    // fetching the data from weather api
    fetch(url).then(res => res.json()).then((data) => {
        // calling the function to insert the Data fetched from api
        insertData(data)
    }).catch(err => console.log(err))
}
getWeather()

search.addEventListener("click", getWeather)



