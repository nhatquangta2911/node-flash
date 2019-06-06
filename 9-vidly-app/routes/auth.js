const mongoose = require("mongoose");
const config = require("config");
const Joi = require("joi");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const { userSchema } = require("../model/user");
const auth = require("../middleware/auth.js");

const User = mongoose.model("User", userSchema);

router.get('/checkToken', auth, (req, res) => {
   if(req.user) {
      res.sendStatus(200);
   } else {
      res.status(500).send('TOKEN WRONG!')
   }
});

router.post("/", async (req, res) => {
   const { error } = validate(req.body);
   if (error) return res.status(400).send(error.details[0].message);

   //TODO: Validating email (no matter right or wrong -> tell them 400)
   let user = await User.findOne({
      email: req.body.email
   });
   if (!user) return res.status(400).send("Invalid email or password.");

   //TODO: Validating  password
   const validPassword = await bcrypt.compare(req.body.password, user.password);
   if (!validPassword) return res.status(400).send("Invalid password");
   //TODO: Valid Login -> send true for client
   //TODO: Create new JWT

   const token = user.generateAuthToken();
   console.log(token);
   res.cookie('token', token).sendStatus(200);
});

const validate = req => {
   const schema = {
      email: Joi.string()
         .min(5)
         .max(255)
         .required()
         .email(),
      password: Joi.string()
         .min(5)
         .max(255)
         .required()
   };
   return Joi.validate(req, schema);
};

module.exports = router;
