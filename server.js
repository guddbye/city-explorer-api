'use strict';

console.log('Server face');

// ***** REQUIRE *****
// In our server, we have to use 'require' instead of 'import'
// Here we will list the requirement for a server.

const express = require('express');
const cors = require('cors');
require('dotenv').config();
let weatherData = require('./data/weather.json');

// ****** USE ******
//Once I have required something, we have to use it.
// This is where we assign the requireed file a variable name.
// React does this in one step with 'import'
// It says we must use it and assign it to a variable.
// Express takes two steps: 'require' and 'use'.
// This is just how Express works.
const app = express();
app.use(cors());

// Defines my port, validate that my .env file is working.

const PORT = process.env.PORT || 3002;
// 3002 - If my server runs on 3002, I know something is wrong with my .env file or how I am importing values from it.

// ***** ROUTES ******
// We will use these to access our endpoints

app.get('/', (request, response) => {
  response.send('Hello from the heaven.');

});

app.get('/hello', (request, response) => {
  console.log(request.query.name);
  let name = request.query.name;
  let lastName = request.query.lastName;
  response.send(`Hello ${name} ${lastName}!`);

});


app.get('/weather', (request, response) => {
  const mySearchQuery = request.query.searchQuery;
  console.log(weatherData);
  console.log('From weather: ', request.query);
  console.log('Line 48 ', request.query.searchQuery);
  const dataToSend = weatherData.find(object => object.city_name.toLowerCase() === mySearchQuery.toLowerCase());
  console.log('Line 50', dataToSend.data);
  let dataArr = dataToSend.data.map(dataForecast => new Forecast(dataForecast));

  console.log('Line 56 ', dataArr);

  response.send(dataArr);
});


// ***** CATCHALL *****
// Goes at the bottom of our route.

app.get('*', (request, response) => {
  response.send('The page you are on, does not exist. How did you get here?');
});


// ***** CLASS *****

class Forecast {
  constructor(weatherObject) {
    console.log('This :', weatherObject.datetime, weatherObject.weather.description);
    this.datetime = weatherObject.datetime;
    this.description = weatherObject.weather.description;
  }
}

// ****** ERRORS ******

app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

// ***** LISTEN *****
// Starts the server
// .listen() is an express method that takes in a PORT value and a callback function.

app.listen(PORT, ()=> console.log(`listening on port ${PORT}`));
