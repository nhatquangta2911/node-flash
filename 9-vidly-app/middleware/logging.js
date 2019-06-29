const winston = require('winston');
// require('winston-mongodb');

const logger = winston.createLogger({
   level: 'info',
   format: winston.format.json(),
   transports: [
      // new winston.transports.MongoDB({ db: 'mongodb+srv://shawn_2911:mrmms2amj@cluster0-r6muz.mongodb.net/test?retryWrites=true', level: 'error' }),
      // new winston.transports.File({ filename: 'error.log', level: 'error' }),
      // new winston.transports.File({ filename: 'combined.log' }),
      // new winston.transports.Console({colorize: true, prettyPrint: true}),
   ]
});

if(process.env.NODE_ENV !== 'production') {
   logger.add(new winston.transports.Console({
      format: winston.format.combine(
         winston.format.simple()
      ),
   }));  
   logger.add(new winston.transports.File({
      filename: 'error.log', level: 'error'
   }));
};

module.exports = {
   logger: logger
};