const _ = require("lodash");
const bcrypt = require("bcrypt");
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const {userSchema} = require('../model/user');
const Joi = require('joi');
const User = mongoose.model('User', userSchema);
const pageSize = 2;

//TODO: GET
router.get("/", async (req, res) => {
   const users = await User.find()
      .sort("-name")
      .select("name email avatarPicture score");
   res.send(users);
});

router.get("/best", async (req, res) => {
   const users = await User.find()
      .sort("-score")
   res.send(users);
});

router.get("/user/:id", async (req, res) => {
   const user = await User.findOne({
      _id: req.params.id

   }).select("name email isAdmin avatarPicture score");
   if (!user) return res.status(404).send('Username is not exist');
   res.send(user);
});

router.get("/page/:page", async (req, res) => {
   const users = await User.find()
      .sort("-name")
      .skip((req.params.page - 1) * pageSize)
      .select("_id name email avatarPicture scrore")
      .limit(pageSize);
   res.send(users);
});

//TODO: REGISTER
router.post("/", async (req, res) => {
   const { error } = validate(req.body);

   if (error) return res.status(400).send(error.details[0].message);

   let user = await User.findOne({
      email: req.body.email
   });

   if (user) return res.status(400).send('User is already exist')
   user = new User(_.pick(req.body, ['name', 'email', 'password', 'isAdmin', 'avatarPicture', 'score']));
   const salt = await bcrypt.genSalt(10);
   user.password = await bcrypt.hash(user.password, salt);
   const result = await user.save();
   // res.send(_.pick(user, ['_id', 'name', 'email', 'password']));
   const token = user.generateAuthToken();
   //TODO: Send token via res header
   res.send(token);
});
const validate = req => {
   const schema = {
      name: Joi.string()
         .min(5)
         .max(255)
         .required(),
      email: Joi.string()
         .min(5)
         .max(255)
         .required()
         .email(),
      password: Joi.string()
         .min(5)
         .max(255)
         .required(),
      avatarPicture: Joi.string().min(10),
      score: Joi.number()
         .min(0),
      isAdmin: Joi.boolean()
   };
   return Joi.validate(req, schema);
};

module.exports = router;
