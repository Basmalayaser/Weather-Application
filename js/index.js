
let apikey="4dbb39245f38472b912143955241007"

let searchPosition =document.querySelector("#searchPosition")

if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(e){
        let latitude= e.coords.latitude
        let longitude = e.coords.longitude
        getWeatherData(`${latitude},${longitude}`)

    })
}

searchPosition.addEventListener("input",function(e){
    getWeatherData(e.target.value)
})

 async function getWeatherData(position){
    let api= await fetch(`https://api.weatherapi.com/v1/current.json/forecast.json?days=3&key=${apikey}&q=${position}`)
    let data= await api.json()
    displayTodayWeather(data)
    displayTomorrow(data)
    displayThirdDay(data)
   
}

function displayTodayWeather(data){
    let date=data.current.last_updated
    let currentDate = new Date(date)

    let todayDayNumber= currentDate.getDate()
    todayDay.innerHTML=currentDate.toLocaleString('en-us',{weekday:'long'})
    let todayMonth=currentDate.toLocaleString('en-us',{month:'long'})
    todayDayNum.innerHTML=`${todayDayNumber}${todayMonth}`

    country.innerHTML =data.location.name
    temp_c.innerHTML =data.current.temp_c

    let tempIconeURL=data.current.condition.icon
    tempIcone.setAttribute('src',tempIconeURL)
   
    tempText.innerHTML=data.current.condition.text

   humidity.innerHTML =data.current.humidity
   wind.innerHTML =data.current.wind_kph
   windDirection.innerHTML =data.current.wind_dir
   console.log(data)
}


function displayTomorrow({forecast}){
    let date = forecast.forecastday[1].date
    let tomorrwoDate = new Date(date)

    tDay.innerHTML=tomorrwoDate.toLocaleString('en-us',{weekday:'long'})

    let tIconURL =forecast.forecastday[1].day.condition.icon
    tIcon.setAttribute('src',tIconURL)

    tMaxTemp.innerHTML=forecast.forecastday[1].day.maxtemp_c
    tMinTemp.innerHTML=forecast.forecastday[1].day.mintemp_c

    tText.innerHTML=forecast.forecastday[1].day.condition.text
}


function displayThirdDay({forecast}){
    let date = forecast.forecastday[2].date
    let thirdDate = new Date(date)

    thirdDayText.innerHTML=thirdDate.toLocaleString('en-us',{weekday:'long'})

    let thirdIconURL =forecast.forecastday[2].day.condition.icon
    thirdIcon.setAttribute('src',thirdIconURL)

    thirdMaxTemp.innerHTML=forecast.forecastday[2].day.maxtemp_c
    thirdMinTemp.innerHTML=forecast.forecastday[2].day.mintemp_c

    thirdText.innerHTML=forecast.forecastday[2].day.condition.text
}
