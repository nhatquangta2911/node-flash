const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

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

//TODO: GET
router.get('/', async (req, res) => {
   const movies = await Movie
      .find()
      .populate({
         path: 'genres',
         select: 'name -_id',
         populate: {
            path: 'genres',
            model: 'Genre'
         }
      })
      .sort('-title');
   if (!movies) {
      return res.status(404).send("NOT FOUND");
   } else {
      res.send(movies);
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

module.exports = router;