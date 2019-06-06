const express = require("express");
const home = require("../routes/home");
const genres = require("../routes/genres");
const customers = require("../routes/customers");
const movies = require("../routes/movies");
const rentals = require("../routes/rentals");
const users = require("../routes/users");
const auth = require("../routes/auth");
const stats = require("../routes/stats");
const cards = require("../routes/cards");
const error = require("../middleware/error");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

module.exports = app => {
   app.use(cors({ origin: "*", credentials: true }));
   app.use(bodyParser.urlencoded({ extended: true }));
   app.use(bodyParser.json());
   app.use(express.json());
   app.use(morgan("tiny"));
   app.use(cookieParser());
   app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
   app.use("/", home);
   app.use("/api/cards", cards);
   app.use("/api/genres", genres);
   app.use("/api/customers", customers);
   app.use("/api/movies", movies);
   app.use("/api/rentals", rentals);
   app.use("/api/users", users);
   app.use("/api/auth", auth);
   app.use("/api/stats", stats);
   //TODO: Just passing a reference
   app.use(error);
};
