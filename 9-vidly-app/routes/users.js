const _ = require('lodash');
const bcrypt = require('bcrypt');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const {userSchema} = require('../model/user');

const User = mongoose.model('User', userSchema);
const pageSize = 2;

//TODO: GET
router.get('/', async (req, res) => {
   const users = await User.find().sort("-name").select("name email");
   res.send(users);
});

router.get('/user/:email', async (req, res) => {
   const user = await User.findOne({email: req.params.email}).select("name email");
   if(!user) return res.status(404).send('Username is not exist');
   res.send(user);
});

router.get('/page/:page', async (req, res) => {
   const users = await User
      .find()
      .sort('-name')
      .skip((req.params.page - 1) * pageSize)
      .select('_id name email')
      .limit(pageSize);
   res.send(users);
});

//TODO: REGISTER
router.post('/', async (req, res) => {
   const checkUser = await User.findOne({email: req.body.email});
   if(checkUser) return res.status(400).send('User is already exist') 
   const user = new User(_.pick(req.body, ['name', 'email', 'password']));
   const salt = await bcrypt.genSalt(10);
   user.password = await bcrypt.hash(user.password, salt);
    try {     
      await user.save();
      res.send(_.pick(user, ['_id', 'name', 'email']));
    } catch (ex) {
       let errorMessage = '';
       for(field in ex.errors) {
          errorMessage += ex.errors[field] + '\n';
       }
       res.status(400).send('INVALID\n' + errorMessage);
    }
});

module.exports = router;