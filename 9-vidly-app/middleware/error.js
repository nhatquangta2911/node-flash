module.exports = (err, req, res, next) => {
   //TODO: 1. Send a friendly error to the Client
   res.status(500).send("Something failed.");
};
