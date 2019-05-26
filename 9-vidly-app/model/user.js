const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20,
      trim: true
   },
   email: {
      type: String,
      unique: true,
      required: true,
      maxlength: 50,
      match: /[a-z0-9]{3,15}\.*[a-z0-9]{3,15}@[a-z]{2,}(\.[a-z]{1,}){1,3}/g
   },
   password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 100,
      lowercase: true
   }
});


module.exports.userSchema = userSchema;