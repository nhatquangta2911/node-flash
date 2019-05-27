const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const home = require('./routes/home');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const bodyParser = require('body-parser');
const app = express();

// if(!config.get('jwtPrivateKey')) {
//    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
//    process.exit(1); // = 0: success
// }

mongoose
   .connect("mongodb://localhost:27017/vidly-app", {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true
   })
   .then(() => console.log("Connected"))
   .catch(err => console.error("Something went wrong!", err));

app.use(bodyParser.urlencoded({
   extended: true
}));
app.use(bodyParser.json());

app.use(express.json());
app.use(morgan('tiny'));
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', home);
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);


const port = 2911;

app.listen(port, () => {
   console.log(`Listening on port ${port}`);
});