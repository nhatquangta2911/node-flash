require('express-async-errors');
const express = require("express");
const error = require('./middleware/error');
const config = require("config");
const mongoose = require("mongoose");
const home = require("./routes/home");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const users = require("./routes/users");
const auth = require("./routes/auth");
const stats = require("./routes/stats");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const {logger} = require('./middleware/logging');

//TODO: (Just SYNC) EventEmitter raise an event when node process (no catch) error
process.on('uncaughtException', (ex) => {
   logger.error(ex.message, ex);
   process.exit(1);
});

//TODO: (ASYNC - Promises)
process.on('unhandledRejection', (ex) => {
   logger.error(ex.message, ex);
   process.exit(1);
});

logger.info('Starting application...');

const p = Promise.reject(new Error('Fail'));
p.then(() => console.log('DONE'));

require("./startup/prod")(app);

if (!config.get("jwtPrivateKey")) {
   console.error("FATAL ERROR: jwtPrivateKey is not defined.");
   process.exit(1); // = 0: success
}

mongoose
   .connect(config.get("db"), {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true
   })
   .then(() => console.log("Connected"))
   .catch(err => console.error("Something went wrong!", err));

app.use(
   cors({
      origin: "*",
      credentials: true
   })
);

// app.use(function (req, res, next) {
//    res.header("Access-Control-Allow-Origin", "http://192.168.21.1:8080");
//    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
//    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//    next();
// });

app.use(
   bodyParser.urlencoded({
      extended: true
   })
);
app.use(bodyParser.json());

app.use(express.json());
app.use(morgan("tiny"));
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/", home);
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/stats", stats);

//TODO: Just passing a reference
app.use(error);

const port = 2911;

app.listen(process.env.PORT || port, () => {
   console.log(`Listening on port ${port}`);
});
