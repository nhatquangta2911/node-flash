const express = require('express');
const home = require('./routes/home');
const genres = require('./routes/genres');
const morgan = require('morgan');

const app = express();

app.use(express.json());
app.use(morgan('tiny'));
app.use('/', home);
app.use('/api/genres', genres);

const port = 2911;

app.listen(port, () => {
   console.log(`Listening on port ${port}`);
});