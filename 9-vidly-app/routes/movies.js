const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { genreSchema } = require("./genres");
const { movieSchema } = require("../model/movie");
const auth = require('../middleware/auth');

const Movie = mongoose.model("Movie", movieSchema);
const Genre = mongoose.model("Genre", genreSchema);

//TODO: GET
router.get("/", async (req, res) => {
   const movies = await Movie.find()
      .sort("-name")
      .populate({
         path: "genres",
         select: "name",
         populate: {
            path: "genres",
            model: "Genre"
         }
      });
   res.send(movies);
});

router.get("/movie/:id", async (req, res) => {
   const movie = await Movie.findOne({
      _id: req.params.id
   })
      .populate({
         path: "genres",
         select: "name",
         populate: {
            path: "genres",
            model: "Genre"
         }
      })
      .sort("-title");
   if (!movie) {
      return res.status(404).send("NOT FOUND");
   } else {
      res.send(movie);
   }
});

router.get("/best3", async (req, res) => {
   const movies = await Movie
      .find()
      .limit(3)
      .sort("-dailyRentalRate")
      .select("title dailyRentalRate");
      try {
         res.send(movies);
      } catch(ex) {
         return res.status(500).send(ex);
      }
});

router.get('/:query/search', async (req, res) => {
   const regexp = new RegExp(req.params.query, 'i');
   const movies = await Movie
      .find({title: regexp})
      .sort('title');
   res.send(movies);
});

//TODO: POST
router.post("/", auth, async (req, res) => {
   const movie = new Movie({
      title: req.body.title,
      genres: req.body.genres,
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate
   });
   try {
      const result = await movie.save();
      res.send(result);
   } catch (ex) {
      let errorMessages = "";
      for (field in ex.errors) {
         errorMessages += ex.errors[field].message + "\n";
      }
      res.status(400).send(errorMessages);
   }
});

//TODO: DELETE
router.delete("/:id", auth, async (req, res) => {
   const result = await Movie.findByIdAndRemove(req.params.id);
   if (result.deleteCount === 0) return res.status(404).send("NOT FOUND");
   res.send(result);
});

//TODO: UPDATE
router.put("/:id", auth, async (req, res) => {
   const movie = await Movie.findOne({ _id: req.params.id });
   if (!movie) {
      return res.status(404).send("NOT FOUND");
   } else {
      try {
         movie.title = req.body.title;
         movie.genres = req.body.genres;
         movie.numberInStock = req.body.numberInStock;
         movie.dailyRentalRate = req.body.dailyRentalRate;
         const result = await movie.save();
         res.send(result);
      } catch (ex) {
         let errorMessages = "";
         for (field in ex.errors) {
            errorMessages += ex.errors[field].message + "\n";
         }
         return res.status(400).send(errorMessages);
      }
   }
});

module.exports = router;
