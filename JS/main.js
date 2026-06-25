let city =document.getElementById('city')
let nowDegree =document.getElementById("nowDegree")
let humidity =document.getElementById("humidity")
let wind =document.getElementById("wind")
let direction =document.getElementById("direction")
let statuss =document.getElementById("status")
let nowImg =document.getElementById("nowImg")
let searchInput =document.getElementById("searchInput")
let nextDayDate = document.getElementsByClassName('nextDayDate')
let nextDayImg = document.getElementsByClassName('nextDayImg')
let nextDaystatuss = document.getElementsByClassName('nextDaystatuss')
let NextMinTemp = document.getElementsByClassName('NextMinTemp')
let NextMaxTemp = document.getElementsByClassName('NextMaxTemp')
let date = new Date()

async function getWeatherData (city) {
let weather = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=ef2edc664cca42c6be065829261506&q=${city}&days=3`)
let weatherData =await weather.json()
return(weatherData)

}



async function start(city='cairo'){
    let weatherData =await getWeatherData(city)
    if (!weatherData.error) {
    Now(weatherData)
Next(weatherData)
 }
}
start()

function Now(data){
    city.innerHTML = data.location.name
    nowDegree.innerHTML = data.current.temp_c
humidity.innerHTML = data.current.humidity
wind.innerHTML = data.current.wind_kph
direction.innerHTML = data.current.wind_dir
statuss.innerHTML = data.current.condition.text
nowImg.setAttribute("src" , data.current.condition.icon )

}

function Next(data){
for (let i = 0; i <2; i++) {
     let Nextdate = new Date(data.forecast.forecastday[i+1].date)
     nextDayDate[i].innerHTML= Nextdate.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' })
    NextMaxTemp[i].innerHTML = data.forecast.forecastday[i+1].day.maxtemp_c
    NextMinTemp[i].innerHTML = data.forecast.forecastday[i+1].day.mintemp_c
    nextDaystatuss[i].innerHTML = data.forecast.forecastday[i+1].day.condition.text
    nextDayImg[i].setAttribute("src" , data.forecast.forecastday[i+1].day.condition.icon )

}
}

searchInput.addEventListener('keyup', function () {
    let search = searchInput.value.trim();
    if (search === '') {
        start('cairo'); 
    } else {
        start(search);
    }
});