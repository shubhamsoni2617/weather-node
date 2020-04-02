const axios = require('axios');

const mapBoxApi =
  'pk.eyJ1Ijoic2h1YmhhbXNvbmkyNjE3IiwiYSI6ImNrOGVyYXNieDA1NTkzbXFzd25hN29raWQifQ.Y8Zn3uHEIBzk4u2DY8VtXw';

const forecastApi = '2f0a0e04747b36c4494c8549259ca288';

const fetchPosition = async (place, callBack) => {
  try {
    const body = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
      { params: { access_token: mapBoxApi } }
    );
    callBack(undefined, {
      lat: body.data.features[0].center[1],
      long: body.data.features[0].center[0],
      place: body.data.features[0].place_name
    });
  } catch (error) {
    try {
      callBack(error.response.data.message);
    } catch {
      callBack('No valid response found. Check input place');
    }
  }
};

const fetchForecastWeather = async (lat, long, place, callBack) => {
  try {
    const body = await axios.get(
      `https://api.darksky.net/forecast/${forecastApi}/${lat},${long}`,
      { params: { units: 'si' } }
    );
    callBack(
      undefined,
      'Current Temperature  in ' +
        place +
        ' is ' +
        body.data.currently.temperature
    );
  } catch (error) {
    try {
      callBack(error.response.data.error);
    } catch {
      callBack('No valid response found. Check co-ordinates');
    }
  }
};

module.exports = { fetchPosition, fetchForecastWeather };
