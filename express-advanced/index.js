const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const config = require('config');
const express = require('express');
const Joi = require('joi');
const helmet = require('helmet');
const morgan = require('morgan');
const logger = require('./middlewares/logger');

// Re-structuring (Using Route)
const courses = require('./routes/courses');
const home = require('./routes/home');

const app = express();

// Template Engine (Views engine)
app.set('views', './views'); // default
app.set('view engine', 'pug');


// 1 - built-in middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); 

// Routes in app
app.use('/api/courses', courses); 
app.use('/', home);
 
// Configuration
console.log(`Application Name: ${config.get('name')}`);
console.log(`Mail Server: ${config.get('mail.host')}`);
console.log(`Mail Password: ${config.get('mail.password')}`);

// 2 - 3rd party middlewares
app.use(helmet());
if(app.get('env') === 'development') {
   app.use(morgan('tiny'));
   startupDebugger('Morgan enabled...');
}

// DB work... 
dbDebugger('Connected to the DB...');

// 3 - custom middleware (do logging)
app.use(logger);

// 3 - custom middleware (do authentication)
app.use(function(req, res, next) {
   console.log('Authenticating...');
   next();
});
 
// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
// console.log(`app: ${app.get('env')}`);

const port = config.get('port');

app.listen(port, () => {
   console.log(`Listening on port ${port}...`);
})

