const express = require('express');
const router = express.Router();
const Joi = require('joi');

const users = [
   {
      id: 1,
      username: 'user1',
      email: 'user1@gmail.com'
   },
   {
      id: 2,
      username: 'user2',
      email: 'user2@gmail.com'
   },
   {
      id: 3,
      username: 'user3',
      email: 'user3@gmail.com'
   },
]

router.get('/', (req, res) => {
   res.send(users);
});

router.get('/:id', (req, res) => {
   const user = users.find(u => u.id === parseInt(req.params.id));
   if(!user) return res.status(404).send('Not found');
   res.send(user);
});

// POST method
router.post('/', (req, res) => {
   const { error } = validateUser(req.body);
   if(error) return res.status(400).send(error.details[0].message);
   const user = {
     id: users.length + 1,
     name: req.body.name,
     email: req.body.email 
   }
   users.push(user);
   res.send(users);
});

// PUT method
router.put('/:id', (req, res) => {
      
   const user = users.find(u => u.id === parseInt(req.params.id));
   if(!user) return res.status(404).send('Not found');
   const { error } = validateUser(req.body);
   if(error) return res.status(400).send(error.details[0].message);

   user.name = req.body.name;
   user.email = req.body.email;
   res.send(users);
});

// DELETE method
router.delete('/:id', (req, res) => {
   const user = users.find(u => u.id === parseInt(req.params.id));
   if(!user) return res.status(404).send('Not found');
   const index = users.indexOf(user);
   users.splice(index, 1);
   res.send(user);
});

// Validate function
const validateUser = (user) => {
   const schema = {
      name: Joi.string().min(5).required(),
      email: Joi.string().regex(/^[a-z]{5,}$/i).required()
   }
   return Joi.validate(user, schema);
}

module.exports = router;