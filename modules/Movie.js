'use strict';

const axios = require('axios');
const cache = require('./Cache.js'); // Import cache module

// Function to get movie data
async function getMovies(request, response, next) {
  try {
    const searchQuery = request.query.searchQuery;
    const key = searchQuery + 'Data';
    const acceptableTimeToCache = 1000 * 60 * 60 * 24 * 30; // 30 days in milliseconds

    // Check if data is in cache and not expired
    if (cache[key] && Date.now() - cache[key].timestamp < acceptableTimeToCache) {
      console.log('Movies cache hit');
      return response.status(200).send(cache[key].data);
    }

    console.log('Movies cache miss');
    // Fetch movie data from API
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}&page=1&include_adult=false`;
    const { data } = await axios.get(url);

    if (!data || !data.results) {
      // Handle API response error
      return response.status(500).send('Movie API response error');
    }

    // Format movie data using map and CityMovies class
    const dataToSend = data.results.map((movObj) => new CityMovies(movObj));

    // Cache the formatted data with timestamp
    cache[key] = {
      data: dataToSend,
      timestamp: Date.now(),
    };

    // Send formatted data as response
    response.send(dataToSend);
  } catch (error) {
    next(error);
  }
}

// Class to format movie data
class CityMovies {
  constructor(movieObject) {
    this.title = movieObject.original_title;
    this.overview = movieObject.overview;
    this.total_votes = movieObject.vote_count || ''; // Use default if vote_count is missing
    this.image_url = movieObject.poster_path || ''; // Use default if poster_path is missing
    this.released_on = movieObject.release_date;
  }
}

module.exports = getMovies;
