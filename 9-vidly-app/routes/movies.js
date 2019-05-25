const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const {genreSchema} = require('./genres');

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
         isAsync: true,
         validator: function (value, cb) {
            setTimeout(() => {
               const result = value && value.length > 0;
               cb(result);
            }, 1000);
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

const Movie = mongoose.model('Movie', movieSchema);
const Genre = mongoose.model('Genre', genreSchema);

//TODO: GET
router.get('/', async (req, res) => {
   const movies = await Movie
      .find()
      .sort("-name")
      .populate({
         path: "genres",
         select: "name -_id",
         populate: {
            path: "genres",
            model: "Genre"
         }
      });
   res.send(movies);
});

router.get('/:id', async (req, res) => {
   const movie = await Movie
      .findOne({_id: req.params.id})
      .populate({
         path: 'genres',
         select: 'name -_id',
         populate: {
            path: 'genres',
            model: 'Genre'
         }
      })
      .sort('-title');
   if (!movie) {
      return res.status(404).send("NOT FOUND");
   } else {
      res.send(movie);
   }
});

//TODO: POST
router.post('/', async (req, res) => {
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
      let errorMessages = '';
      for (field in ex.errors) {
         errorMessages += ex.errors[field].message + '\n';
      };
      res.status(400).send(errorMessages);
   }
});

//TODO: DELETE
router.delete('/:id', async (req, res) => {
   const result = await Movie.findByIdAndRemove(req.params.id);
   if(result.deleteCount === 0) return res.status(404).send("NOT FOUND");
   res.send(result);
});

module.exports = router;