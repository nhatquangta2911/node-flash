const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {rentalSchema} = require('../model/rental');

const Rental = mongoose.model('Rental', rentalSchema);

//TODO: 5 recent rentals
router.get('/rentals/recent', async (req, res) => {
   const rentals = await Rental
      .find()
      .sort('-dateOut')
      .limit(5);
   res.send(rentals);
});

module.exports = router;