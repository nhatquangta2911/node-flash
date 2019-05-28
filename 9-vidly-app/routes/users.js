const _ = require('lodash');
const bcrypt = require('bcrypt');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const {
   userSchema
} = require('../model/user');
const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const auth = require('../middleware/auth');
const User = mongoose.model('User', userSchema);
const pageSize = 2;

//TODO: GET
router.get('/', async (req, res) => {
   const users = await User.find().sort("-name").select("name email");
   res.send(users);
});

router.get('/user/:email', async (req, res) => {
   const user = await User.findOne({
      email: req.params.email
   }).select("name email isAdmin");
   if (!user) return res.status(404).send('Username is not exist');
   res.send(user);
});

router.get('/page/:page', async (req, res) => {
   const users = await User
      .find()
      .sort('-name')
      .skip((req.params.page - 1) * pageSize)
      .select('_id name email password')
      .limit(pageSize);
   res.send(users);
});

//TODO: REGISTER
router.post('/', async (req, res) => {
   const {
      error
   } = validate(req.body);
   if (error) return res.status(400).send(error.details[0].message);

   let user = await User.findOne({
      email: req.body.email
   });
   if (user) return res.status(400).send('User is already exist')
   user = new User(_.pick(req.body, ['name', 'email', 'password']));
   const salt = await bcrypt.genSalt(10);
   user.password = await bcrypt.hash(user.password, salt);
   const result = await user.save();
   // res.send(_.pick(user, ['_id', 'name', 'email', 'password']));
   const token = jwt.sign({
         _id: user._id,
         isAdmin: user.isAdmin
      }, //TODO: payload
      config.get('jwtPrivateKey') // digital signature
   );
   //TODO: Send token via res header
   res.header('x-auth-token', token).send(result);
})

const validate = (req) => {
   const schema = {
      name: Joi.string().min(5).max(255).required(),
      email: Joi.string().min(5).max(255).required().email(),
      password: Joi.string().min(5).max(255).required(),
      isAdmin: Joi.required()
   };
   return Joi.validate(req, schema);
}

module.exports = router;