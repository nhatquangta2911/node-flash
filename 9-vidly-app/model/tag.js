const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 40,
      trim: true
   },
   description: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1024,
      trim: true
   }
});

module.exports.tagSchema = tagSchema;