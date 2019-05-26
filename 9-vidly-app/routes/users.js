const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const {userSchema} = require('../model/user');

const User = mongoose.model('User', userSchema);

//TODO: REGISTER
router.post('/', async (req, res) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });
    try {
       const result = await user.save();
       res.send(result);
    } catch (ex) {
       let errorMessage = '';
       for(field in ex.errors) {
          errorMessage += ex.errors[field] + '\n';
       }
       res.status(400).send('INVALID\n' + errorMessage);
    }
});

module.exports = router;