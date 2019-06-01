const {logger} = require("./middleware/logging");
const express = require("express");
const app = express();

require("./startup/routes")(app);
require("./startup/db")();
require("./startup/logging")();
require("./startup/config");
require("./startup/prod")(app);

const port = 2911;

app.listen(process.env.PORT || port, () => {
   logger.info(`Listening on port ${port}`);
});