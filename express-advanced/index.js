const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const config = require('config');
const express = require('express');
const Joi = require('joi');
const helmet = require('helmet');
const morgan = require('morgan');
const logger = require('./logger');

const app = express();

const courses = [
   {
      id: 1,  
      name: 'NodeJS'
   },
   {
      id: 2,
      name: 'ReactJS'
   }
]

app.set('view engine', 'pug');
app.set('views', './views'); // default

// 1 - built-in middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); 
 
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
 
app.get('/', (req, res) => {
   res.render('index', {
      title: 'My Express App',
      message: 'Hello world!'
   })
});

app.get('/api/courses', (req, res) => {
   res.send(courses);   
});

app.post('/api/courses', (req, res) => {
   const { error } = validateCourse(req.body);
   if(error) return res.status(400).send(error.details[0].message);
   const course = {
      id: courses.length + 1,
      name: req.body.name
   }
   courses.push(course);
   res.send(courses);
});

const validateCourse = (course) => {
   const schema = {
      name: Joi.string().min(3).required()
   }
   return Joi.validate(course, schema);
}

// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
// console.log(`app: ${app.get('env')}`);

const port = config.get('port');

app.listen(port, () => {
   console.log(`Listening on port ${port}...`);
})

