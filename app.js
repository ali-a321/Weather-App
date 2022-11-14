

const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const search = document.getElementById("search");
    const city = search.value 
    const apiURL = "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&APPID=ca315bc9aabea979ebe349303f329601"
    
    getWeather()
        
    async function getWeather(){


        const retrieveWeather = await fetch(apiURL);
        const response = await retrieveWeather.json();
        console.log(response)
        clearCity()
     
        function clearCity(){
            const leftSide = document.querySelector(".leftSidePanel")
            const rightSide = document.querySelector(".rightSidePanel")
            leftSide.innerHTML = ""
            rightSide.innerHTML = ""

            showWeather()
        };
        function showWeather(){
            
            const leftSide = document.querySelector(".leftSidePanel")
            const rightSide = document.querySelector(".rightSidePanel")
            const currentLocation = document.createElement("div")
            const currentTemp = document.createElement("div")
            const currentTime = document.createElement("div")
            const windSpeed = document.createElement("div")
            const windGust = document.createElement("div")
            const feelTemp = document.createElement("div")
            const humid = document.createElement("div")
            const changeFah = document.createElement("div")
            const currentWeather = document.createElement("div")
            const weatherIcon = document.createElement("div");
            const weatherimg = document.createElement("img")

            


            
            //left panel
            currentWeather.classList.add("currentWeather")
            currentWeather.innerHTML = capitalizeFirstLetter(response.weather[0].description)
            currentLocation.classList.add("currentLocation")
            currentLocation.innerHTML = response.name
            currentTemp.classList.add("currentTemp")
            currentTemp.innerHTML = Math.round(response.main.temp - 273.15)+ " °C"
            currentTime.classList.add("currentTime")
            changeFah.classList.add("changeFah")
            weatherIcon.classList.add("weathericon");
            weatherimg.classList.add("weatherimg")
            
           
            //
                    
            changeFah.innerHTML =  "Display °F"
            
            changeFah.addEventListener("click",conversion)
            function conversion() {   
                if (currentTemp.innerHTML = Math.round(response.main.temp - 273.15)+ " °C"){
                   return (currentTemp.innerHTML = Math.round((response.main.temp - 273.15)*9/5 + 32) + " °F") 
                   + (changeFah.innerHTML = "") 
                   + (feelTemp.innerHTML = "Feels Like" +"<br>" +Math.round((response.main.feels_like - 273.15)*9/5 + 32) + " °F") }+"<b>" 
            }

            weatherimg.src = `https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`
           
            leftSide.appendChild(currentWeather)
            leftSide.appendChild(currentLocation)
            leftSide.appendChild(currentTemp)
            leftSide.appendChild(changeFah)
            weatherIcon.appendChild(weatherimg) 
            leftSide.appendChild(weatherIcon)


            //right panel
                       
            windSpeed.classList.add("windSpeed")
            windGust.classList.add("windGust")
            feelTemp.classList.add("feelTemp")
            humid.classList.add("humid")

            const humidImage = document.createElement('img')
            humidImage.classList.add("humidImage")
            humidImage.src = 'humid.svg'
            humidImage.alt = 'Humid logo'
            windSpeed.innerHTML = "Windspeed" +"<br>"+ Math.round(response.wind.speed*3.6) + " km/h" + "<b>"
            feelTemp.innerHTML = "Feels Like" +"<br>" + Math.round(response.main.feels_like - 273.15) + " °C" + "<b>"
            humid.innerHTML = "Humidity" +"<br>"  + response.main.humidity + "%" + "<b>"
           
        

            rightSide.appendChild(feelTemp)
            rightSide.appendChild(humid)
            rightSide.appendChild(windSpeed)
            rightSide.appendChild(windGust)

        }
        
    }

   form.reset()
})



function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }