'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const weather = require('./modules/Weather.js');
const getMovies = require('./modules/Movie.js');

const app = express();

const PORT = process.env.PORT || 3002;
app.use(cors());

app.get('/weather', weatherHandler);
app.get('/movies', getMovies);

function weatherHandler(request, response) {
  const { searchQuery } = request.query;
  weather(searchQuery)
    .then(summaries => response.send(summaries))
    .catch((error) => {
      console.error(error);
      response.status(404).send('Sorry. Something went wrong!');
    });
}

app.listen(PORT, () => console.log(`Server up on ${PORT}`));
