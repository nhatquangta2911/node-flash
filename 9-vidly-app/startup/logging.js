require("express-async-errors");
const { logger } = require("../middleware/logging");

module.exports = () => {
   logger.info("Starting application...");
   //TODO: (Just SYNC) EventEmitter raise an event when node process (no catch) error
   process.on("uncaughtException", ex => {
      logger.error(ex.message, ex);
      process.exit(1); // exit process as a best practice (cuz of unclean state)
      // In production: Tool - process manager - responsible for automatically restart an node process
   });

   //TODO: (ASYNC - Promises)
   process.on("unhandledRejection", ex => {
      logger.error(ex.message, ex);
      process.exit(1);
      // throw an ex => become uncaught exception
   });
};
