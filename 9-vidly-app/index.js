const express = require('express');
const mongoose = require('mongoose');
const home = require('./routes/home');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const morgan = require('morgan');

const app = express();

mongoose
   .connect("mongodb://localhost:27017/vidly-app", {
      useNewUrlParser: true,
      useFindAndModify: false
   })
   .then(() => console.log("Connected"))
   .catch(err => console.error("Something went wrong!", err));

app.use(express.json());
app.use(morgan('tiny'));
app.use('/', home);
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);


const port = 1997;

app.listen(port, () => {
   console.log(`Listening on port ${port}`);
});