const {logger} = require('./logging');

module.exports = (err, req, res, next) => {
   //TODO: 1. Send a friendly error to the Client
   logger.log('error', err.message, err);
   res.status(500).send("Something failed.");
};
