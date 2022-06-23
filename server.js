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
