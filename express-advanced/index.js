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

// 1 - built-in middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); 
 
// 2 - 3rd party middlewares
app.use(helmet());
if(app.get('env') === 'development') {
   app.use(morgan('tiny'));
   console.log('Morgan enabled...');
}

// 3 - custom middleware (do logging)
app.use(logger);

// 3 - custom middleware (do authentication)
app.use(function(req, res, next) {
   console.log('Authenticating...');
   next();
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

const port = process.env.PORT || 3000;

app.listen(port, () => {
   console.log(`Listening on port ${port}...`);
})

