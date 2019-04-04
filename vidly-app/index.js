const express = require("express");
const home = require('./routes/home');
const genres = require('./routes/genres');
const app = express();

app.use(express.json());
app.use('/', home);
app.use('/api/genres', genres);

// Listen on the given port
const port = process.env.PORT || 3000;

app.listen(port, () => {
   console.log(`Listening on port ${port}...`);
});
