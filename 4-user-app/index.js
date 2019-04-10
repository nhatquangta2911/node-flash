const express = require('express');
const home = require('./routes/home');
const users = require('./routes/users');
const config = require('config');

const app = express();

app.use(express.json());
app.use('/', home);
app.use('/api/users', users);
// app.use(express.urlencoded());


// LISTEN TO THE GIVEN PORT
const port = config.get("port");

app.listen(port, () => {
   console.log(`Listening on port ${port}...`);
});