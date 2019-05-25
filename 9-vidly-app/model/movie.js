const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
   title: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 40,
      trim: true
   },
   genres: {
      type: [{
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Genre'
      }],
      validate: {
         validator: function (value) {
            return value && value.length > 0;
         },
         message: 'A movie should have at least one genre!'
      }
   },
   numberInStock: {
      type: Number,
      required: true,
      min: 0,
      max: 1000
   },
   dailyRentalRate: {
      type: Number,
      required: true,
      min: 0,
      max: 1
   }
});

module.exports.movieSchema = movieSchema;