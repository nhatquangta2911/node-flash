const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { genreSchema } = require("../model/genre");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const Genre = mongoose.model("genres", genreSchema);
const pageSize = 5;

const getAllGenres = async () => {
   const genres = await Genre.find()
      .sort("name")
      .select("name");
   return genres;
};

const getGenresByName = async name => {
   return await Genre.find({
      name: name
   }).select("name");
};

const createGenre = async name => {
   const genre = new Genre({
      name: name
   });
   try {
      return await genre.save();
   } catch (ex) {
      return ex;
   }
};

const removeGenreByName = async name => {
   const result = await Genre.deleteOne({
      name: name
   });
   return result;
};

const updateGenreByName = async (name, updatedName) => {
   const genre = await Genre.findOne({ name: name });
   if (!genre) return null;
   try {
      genre.name = updatedName;
      const result = await genre.save();
      return result;
   } catch (ex) {
      return ex;
   }
};

//TODO: GET

router.get("/", async (req, res) => {
   //TODO: 2. Log the exception on the Server 
      const genres = await getAllGenres();
      res.send(genres);
   }
);

router.get("/genre/:name", async (req, res) => {
   const genre = await getGenresByName(req.params.name);
   if (genre.length === 0) return res.status(404).send("Not Found");
   res.send(genre);
});

router.get("/page/:page", async (req, res) => {
   const genres = await Genre.find()
      .skip((req.params.page - 1) * pageSize)
      .sort("name")
      .limit(pageSize);
   res.send(genres);
});

//TODO: SEARCH by name
router.get("/:query/search", async (req, res) => {
   const regexp = new RegExp(req.params.query, "i");
   const genres = await Genre.find({ name: regexp }).sort("name");
   res.send(genres);
});

//TODO: POST    
router.post("/", async (req, res) => {
   const result = await createGenre(req.body.name);
   if (result && result.errors) {
      let errorMessage = "";
      for (field in result.errors) {
         errorMessage += result.errors[field].message + "\n";
      }
      res.status(400).send(errorMessage);
   } else {
      res.send(await getAllGenres());
   }
});

//TODO: UPDATE
router.put("/:name", auth, async (req, res) => {
   const result = await updateGenreByName(req.params.name, req.body.name);
   if (!result) return res.status(404).send("Not Found");
   if (result && result.errors) {
      let errorMessage = "";
      for (field in result.errors) {
         errorMessage += result.errors[field].message + "\n";
      }
      res.status(400).send(errorMessage);
   }
   res.send(await getAllGenres());
});

//TODO: DELETE
router.delete("/:name", [auth, admin], async (req, res) => {
   const result = await removeGenreByName(req.params.name);
   if (result.deletedCount === 0) return res.status(404).send("Not Found");
   res.send(result);
});

module.exports = router;
module.exports.genreSchema = genreSchema;
