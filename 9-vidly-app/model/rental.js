const mongoose = require("mongoose");

const rentalSchema = new mongoose.Schema({
   customer: {
      type: new mongoose.Schema({
         isGold: {
            type: Boolean,
            default: false
            // required: true
         },
         name: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 30,
            trim: true
         },
         phone: {
            type: String,
            required: true,
            match: /^\d{10,11}$/
         }
      }),
      required: true
   },
   movie: {
      type: new mongoose.Schema({
         title: {
            type: String,
            required: true,
            minlength: 4,
            maxlength: 40,
            trim: true
         },
         dailyRentalRate: {
            type: Number,
            // required: true,
            // default: 0.50,
            min: 0,
            max: 1
         }
      }),
      require: true
   },
   dateOut: {
      type: Date,
      required: true,
      default: Date.now 
   },
   dateReturned: {
      type: Date
   },
   rentalFee: {
      type: Number,
      min: 0
   }
});

module.exports.rentalSchema = rentalSchema;
