const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
   name: {
      type: String,
      minlength: 3,
      maxlength: 20,
      required: true,
      trim: true
      // match: /^[a-zA-Z]{3,15}$/gi
   }
});

module.exports.genreSchema = genreSchema;