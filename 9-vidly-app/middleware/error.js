const winston = require('winston');

module.exports = (err, req, res, next) => {
   //TODO: 1. Send a friendly error to the Client
   winston.log('error', err.message, err);
   res.status(500).send("Something failed.");
};
