// Node default Imports
const path = require('path');
console.log('111');
//Node Installed imports
const express = require('express');
const hbs = require('hbs');
const app = express();

const port = process.env.PORT || 3001;
// Project Imports
const API = require('./API/weatherAPI');

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
//Setup handlebar engine and views path
app.set('view engine', 'hbs');
app.set('views', viewsPath);

//Setup hbs to support partials
hbs.registerPartials(partialsPath);

//Setup static directory to serve.
app.use(express.static(publicDirectoryPath));

app.get('/', (req, res) => {
  res.render('index', { name: 'Shubham', title: 'learn handlebars' });
});
app.get('/about', (req, res) => {
  res.render('about', { name: 'Shubham' });
});

app.get('/address', (req, res) => {
  if (!req.query.address) {
    return res.send({ error: 'Provide an address' });
  }
  API.fetchPosition(req.query.address, (error, { lat, long, place } = {}) => {
    if (error) {
      res.send({ error });
    } else {
      API.fetchForecastWeather(lat, long, place, (error, temp) => {
        if (error) {
          res.send({ error });
        } else {
          res.send({ address: temp });
        }
      });
    }
  });
});

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
