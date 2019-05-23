const express = require('express');
const Joi = require('joi');
const mongoose = require('mongoose');
const router = express.Router();

mongoose
   .connect('mongodb://localhost:27017/vidly-app', {
      useNewUrlParser: true,
      useFindAndModify: false
   })
   .then(() => console.log('Connected'))
   .catch(err => console.error('Something went wrong!', err));

const genresSchema = new mongoose.Schema({
   name: {
      type: String,
      minlength: 3,
      maxlength: 20,
      required: true,
      trim: true
   }
});

const getAllGenres = async () => {
   const genres = await Genre
      .find()
      .sort('name')
      .select('name');
   return genres;
}

const getGenresByName = async (name) => {
   return await Genre
      .find({ name: name })
      .select('name');
}

const Genre = mongoose.model('genres', genresSchema);


const createGenre = async () => {
   const genre = new Genre({
      name: '  Journey    '
   });
   const result = await genre.save();
}

const removeGenreByName = async (name) => {
   const result = await Genre.deleteOne({ name: name });
   return result;
}

router.get('/', async (req, res) => {
   const genres = await getAllGenres();
   res.send(genres);
});

router.get('/:name', async (req, res) => {
   const genre = await getGenresByName('Drama');
   res.send(genre);
})

router.delete('/:name', async (req, res) => {
   res.send(await removeGenreByName());   
})

router.post('/', async (req, res) => {
   createGenre();  
   res.send(await getAllGenres());
})

module.exports = router;