const _ = require('lodash');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const {userSchema} = require('../model/user');

const User = mongoose.model('User', userSchema);

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

//TODO: REGISTER
router.post('/', async (req, res) => {
   const checkUser = await User.findOne({email: req.body.email});
   if(checkUser) return res.status(400).send('User is already exist') 
   const user = new User(_.pick(req.body, ['name', 'email', 'password']));
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