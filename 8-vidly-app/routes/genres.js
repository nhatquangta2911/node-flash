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

const genreSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
      trim: true,
      match: /^[a-zA-Z]{3,15}$/gi
   }
});

const Genre = mongoose.model('genres', genreSchema);

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

const createGenre = async (name) => {
   const genre = new Genre({
      name: name
   });
   return await genre.save();
}

const removeGenreByName = async (name) => {
   const result = await Genre.deleteOne({ name: name });
   return result;
}

const updateGenreByName = async (name, updatedName) => {
   return await Genre.findOneAndUpdate(
      { name: name },
      { $set: { name: updatedName } },
      { new: true }
   );
}

//TODO: GET
router.get('/', async (req, res) => {
   const genres = await getAllGenres();
   res.send(genres);
});

router.get('/:name', async (req, res) => {
   const genre = await getGenresByName(req.params.name);
   if(genre.length === 0) return res.status(404).send("Not Found");
   res.send(genre);
});

//TODO: UPDATE
router.put('/:name', async (req, res) => {
   const result = await updateGenreByName(req.params.name, req.body.name);
   if(!result) return res.status(404).send("Not Found");
   res.send(result);
});


//TODO: DELETE
router.delete('/:name', async (req, res) => {
   const result = await removeGenreByName(req.params.name);
   if(result.deletedCount === 0) return res.status(404).send("Not Found");
   res.send(result);   
});


module.exports = router;