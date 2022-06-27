'use strict';
let cache = require('./Cache.js');
const axios = require('axios');

async function getMovies(request, response, next){
  try {
    const searchQuery = request.query.searchQuery;

    let key = searchQuery + 'Data';

    let acceptableTimeToCache = 1000 * 60 * 60 * 24 * 30;

    if(cache[key] && Date.now() - cache[key].timestamp < acceptableTimeToCache){

      console.log('Movies cache miss');
      response.status(200).send(cache[key].data);
    } else { 

      console.log('Movies cache hit')  
      let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}&page=1&include_adult=false`;
      let dataToGroom = await axios.get(url);
      let dataToSend = dataToGroom.data.results.map(movObj => new CityMovies(movObj));
      
      cache[key] = {
        data: dataToSend,
        timestamp: Date.now()
      }

      response.send(dataToSend);
    }
  } catch (error) {
    next(error);
  }
}

class CityMovies {
  constructor(movieObject) {
    this.title = movieObject.original_title;
    this.overview = movieObject.overview;
    this.total_votes = movieObject.vote_count?movieObject.vote_count:'';
    this.image_url = movieObject.poster_path?movieObject.poster_path:'';
    this.released_on = movieObject.release_date;
  }
}

module.exports = getMovies;