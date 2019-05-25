const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
   isGold: {
      type: Boolean,
      required: true
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
});

module.exports.customerSchema = customerSchema;