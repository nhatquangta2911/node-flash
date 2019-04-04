const express = require('express');
const Joi = require('joi');

const app = express();

app.use(express.json());
app.use(express.urlencoded());

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

// GET methods

app.get('/', (req, res) => {
   res.send('Home Page');
});

app.get('/api/users', (req, res) => {
   res.send(users);
});

app.get('/api/users/:id', (req, res) => {
   const user = users.find(u => u.id === parseInt(req.params.id));
   if(!user) return res.status(404).send('Not found');
   res.send(user);
});

// POST method
app.post('/api/users', (req, res) => {
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
app.put('/api/users/:id', (req, res) => {
      
   const user = users.find(u => u.id === parseInt(req.params.id));
   if(!user) return res.status(404).send('Not found');
   const { error } = validateUser(req.body);
   if(error) return res.status(400).send(error.details[0].message);

   user.name = req.body.name;
   user.email = req.body.email;
   res.send(users);
});

// DELETE method
app.delete('/api/users/:id', (req, res) => {
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

// LISTEN TO THE GIVEN PORT
const port = 3000;
app.listen(port, () => {
   console.log(`Listening on port ${port}...`);
});