'use strict';

console.log('Our first server');

// REQUIRE
// we have to use required instead of import.

const express= require('express');
require('dotenv').config();
const weatherData=require('./data/weather.json');

// USE
// once required, we must use it. where we assign required file a variable name

const app=express();

//define port and validate dotevn file is working

const PORT=process.env.PORTANDRE || 3002;


// ROUTES
//we use these to access endpoints
// .get is an express method that correlates to axios.get    prameters(url,callbackfunction)

app.get('/', (request,response)=>{
  response.send('Hello from the other side!');

});

app.get('/weather',(request,response)=>{

  // let queryCity=request.query.city;
  // console.log(queryCity);
  // let queryLat=request.query.lat;
  // console.log(queryLat);
  // let queryLon=request.query.lon;
  // console.log(queryLon);

  let dataToSend=weatherData.find(data=> data.city_name===request.query.city);
  response.send(dataToSend);
  response.send('test of weather route');
});

//catchall route response

app.get('*', (request,response)=>{
  response.send('The page you are looking for doesn\'t exist');
});


//ERRORS
//handle any errors

//LISTEN
//start server and server listens
// .listen is express method that takes port value and callback function

app.listen(PORT,()=>console.log(`Listening on port ${PORT}`));




'use strict';

const express = require('express');
require('dotenv').config();
const app = express();

app.use(express.urlencoded({ extended: false}));

app.get('/', (req, res) => {
  res.send('/');
});

app.get('*', (req, res)=>{
  res.send('The page you are looking for doesn\'t exist');
});

function getWeather(req, res, next) {
req.visitorWeather = true;
next();

}
app.get ('/getWeather', (req, res) => {

});

app.listen(3000);
