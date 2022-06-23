'use strict';

console.log('Server face.');
const express = require('express');
require('dotenv').config();
const weatherData = require('./data/weather.json');

const app = express();

const PORT=process.env.PORTANDRE || 3002;

app.get('/', (request,response)=>{
  response.send('Hello from the other side!');

});

app.get('/weather',(request,response) => {

  let dataToSend = weatherData.find(data => data.city_name === request.query.city);
  response.send(dataToSend);
  response.send('test of weather route');
});

app.get('*', (request,response) => {
  response.send('There seems to be an error.');
});

app.listen(PORT,() => console.log(`PORT: ${PORT}`));

