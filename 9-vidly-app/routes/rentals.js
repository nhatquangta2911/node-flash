const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { rentalSchema } = require("../model/rental");
const { movieSchema } = require("../model/movie");
const { customerSchema } = require("../model/customer");

const Movie = mongoose.model("Movie", movieSchema);
const Customer = mongoose.model("Customer", customerSchema);
const Rental = mongoose.model("Rental", rentalSchema);

//TODO: GET
router.get("/", async (req, res) => {
   const rentals = await Rental.find().sort("-dateOut");
   res.send(rentals);
});

router.get("/:id", async (req, res) => {
   const rental = await Rental.findOne({ _id: req.params.id });
   if (!rental) return res.status(404).send("NOT FOUND");
   res.send(rental);
});

//TODO: POST
router.post("/", async (req, res) => {
   const customer = await Customer.findById(req.body.customerId);
   if (!customer) return res.status(400).send("Invalid Customer");

   const movie = await Movie.findById(req.body.movieId);
   if (!movie) return res.status(400).send("Invalid Movie");

   if (movie.numberInStock === 0)
      return res.status(400).send("Movie is sold out!");

   let rental = new Rental({
      customer: {
         _id: customer._id,
         name: customer.name,
         phone: customer.phone
      },
      movie: {
         _id: movie._id,
         title: movie.title,
         dailyRentalRate: movie.movieRentalRate
      }
   });

   try {
      rental = await rental.save();
      res.send(rental);
      movie.numberInStock--;
      movie.save();
   } catch (ex) {
      let errorMessage = "";
      for (field in ex.errors) {
         errorMessage += ex.errors[field].message + "\n";
      }
      return res.status(400).send(errorMessage);
   }
});

//TODO: UPDATE
// router.put("/:id", async (req, res) => {
//    let rental = await Rental.findById(req.params.id);
//    if (!rental) return res.status(404).send("NOT FOUND");
//    const customer = await Customer.findById(req.body.customerId);
//    if (!customer) return res.status(400).send("Customer Not Found");
//    const movie = await Movie.findById(req.body.movieId);
//    if (!movie) return res.status(400).send("Movie Not Found");

   

//    try {
//       const result = await rental.save();
//       res.send(result);
//       movie.numberInStock--;
//       movie.save();
//    } catch (ex) {
//       let errorMessage = "";
//       for (field in ex.errors) {
//          errorMessage += ex.errors[field].message + "\n";
//       }
//       return res.status(400).send(errorMessage);
//    }
// });

//TODO: DELETE
router.delete('/:id', async (req, res) => {
   const result = await Rental.findByIdAndRemove(req.params.id);
   if(result.deleteCount === 0) return res.status(404).send("NOT FOUND");
   res.send(result);
});

module.exports = router;
