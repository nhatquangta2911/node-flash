const {logger} = require('../middleware/logging');
const mongoose = require('mongoose');
const config = require('config');

module.exports = () => {
   mongoose
      .connect(config.get("db"), {
         useNewUrlParser: true,
         useFindAndModify: false,
         useCreateIndex: true
      })
      .then(() => logger.info(`CONNECTED TO ${config.get("db")}`));
};
