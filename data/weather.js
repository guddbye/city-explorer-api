'use strict'

const axios = require('axios');

async function getWeather ({lat, lon, cityName}) {
  try {
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&days=3&lat=${lat}&lon=${lon}&units=I`;

    let cityWeather = await axios.get(url);
    let selectedCity = cityWeather.data.data.map(dailyWeather => {
      return new Forcast(dailyWeather);
    });
    return selectedCity;
  }catch (error){
    console.log(error.message)
  }
}

class Forcast {
  constructor(cityWeather) {
    this.date = cityWeather.datetime;
    this.description = cityWeather.weather.description;
    this.temp = cityWeather.temp;
    this.min_temp = cityWeather.min_temp;
    this.max_temp = cityWeather.max_temp;
    console.log(cityWeather);
  }
}

module.exports = getWeather;