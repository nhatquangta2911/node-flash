const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { rentalSchema } = require("../model/rental");
const { genreSchema } = require("../model/genre");

const Rental = mongoose.model("Rental", rentalSchema);
const Genre = mongoose.model("Genre", genreSchema);

//TODO: 5 recent rentals
router.get("/rentals/recent", async (req, res) => {
  const rentals = await Rental.find()
    .sort("-dateOut")
    .limit(4);
  res.send(rentals);
});

//TODO: Get 3 random genre
router.get("/genres/randoms", async (req, res) => {
  const genres = await Genre.aggregate([{ $sample: { size: 4 } }]);
  res.send(genres);
});

module.exports = router;
