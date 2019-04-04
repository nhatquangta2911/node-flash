const express = require('express');
const router = express.Router();

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

router.get('/', (req, res) => {
   res.send(courses);
});

router.get('/:id', (req, res) => {
   const course = courses.find(c => c.id === parseInt(req.params.id));
   if(!course) return res.status(404).send('Not Found');
   res.send(course);
});

router.post('/', (req, res) => {
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

module.exports = router;