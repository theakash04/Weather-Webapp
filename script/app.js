let key = "8ff0464ec000d26745455d55a167d9b3";
let baseUrl = "https://api.openweathermap.org/data/2.5/weather?q="
let input = document.querySelector(".search input");
let searchbtn = document.querySelector(".search button");
let tempText = document.querySelector(".temp");
let weather = document.querySelector(".weather-text");
let weatherImg = document.querySelector(".weather");
let locationT = document.querySelector(".location-name");
let app = document.querySelector(".app");


const tempUpdate = async() =>{
  let cityName = input.value;

  let url = `${baseUrl}${cityName}&appid=${key}`;
  let code = await fetch(url);
  let json = await code.json();

  //error in input city
  if(code.status === 404 || cityName === ""){
    document.querySelector(".error").style.display = "flex";
    document.querySelector(".weatherDisplay").style.display = "none";
  }else{
    document.querySelector(".weatherDisplay").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }

  let temp = (json.main.temp) - 273.15; //converting the api temprature in celcius because it give in kelvin

  //weather temprature change
  tempText.innerText = `${temp.toFixed(1)}°C`;

  // weather text 
  let weatherT = json.weather[0].main;
  weather.innerText = `${weatherT}`

  //weather image changing condition
  if(weatherT === "Clear"){
    weatherImg.src = `resources/clear.png`;
    app.setAttribute('style', 'background-color: #0071bd')
  }else if(weatherT === "Fog"){
    weatherImg.src = `resources/mist.png`;
    app.setAttribute('style', 'background-color: #0071bd')
  }else if(weatherT === "Clouds"){
    weatherImg.src = `resources/clouds.png`;
    app.setAttribute('style', 'background-color: #0071bd')
  }else if(weatherT === "Rain"){
    weatherImg.src = `resources/rain.png`;
    app.setAttribute('style', 'background-color: #000000d3');
  }else if(weatherT === "Drizzle"){
    weatherImg.src = `resources/drizzle.png`
    app.setAttribute('style', 'background-color: #0071bd')
  }else if(weatherT === "Snow"){
    weatherImg.src = `resources/snow.png`
    app.setAttribute('style', 'background-color: #113f59')
  }

  // writing the location name on screen
  locationT.innerText = `${json.name}`
  //humidity and wind speed 

  let humidity = document.querySelector("#humidity span");
  humidity.innerText = `${json.main.humidity}%`

  let windSpeedT = document.querySelector("#wind span");
  let windSpeed = json.wind.speed*3.6;
  windSpeedT.innerText = `${windSpeed.toFixed(2)} km/h`
}



searchbtn.addEventListener("click", async()=>{
  tempUpdate();
})

addEventListener("keypress", (evt)=>{
  if(evt.key === "Enter"){
    evt.preventDefault();
    searchbtn.click();
  }
});

window.addEventListener("load", ()=>{
  tempUpdate();
})