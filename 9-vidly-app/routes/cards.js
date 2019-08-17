const validateObjectId = require('../middleware/validateObjectId');
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { cardSchema } = require("../model/card");
const { userSchema } = require('../model/user');
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const jwt = require('jsonwebtoken');
const Fawn = require('fawn');

const Card = mongoose.model("Card", cardSchema);
const User = mongoose.model("User", userSchema);
const pageSize = 8;

//TODO: GET
router.get("/", async (req,  res ) => {
   const cards = await Card.find()
      .sort("-dateCreated")   
      .populate('user')
      .populate('tags');
   res.send(cards);
});

router.get("/my", async (req, res) => {
   const cards = await Card.find({ user: { 
      _id: jwt.decode(req.headers['x-auth-token'])._id
   }}).populate('user');
   res.send(cards);
});

router.get("/card/:id", validateObjectId, async (req, res) => {
   const card = await Card.findById(req.params.id).populate('user');   
   if (!card) return res.status(404).send("NOT FOUND");
   res.send(card);
});

router.get("/random", async (req, res) => {
   const card = await Card
      .aggregate([{
         $sample: {
            size: 4
         }
      }]);
   res.send(card);
});

router.get('/recent', async (req, res) => {
   const cards = await Card
      .find()
      .sort('-dateCreated')
      .limit(4);
   res.send(cards);
});

router.get('/page/:pageNumber', async (req, res) => {
   const numberOfCards = await Card.find().countDocuments((err, count) => count);
   const numberOfPages = (numberOfCards % pageSize === 0) ? parseInt(numberOfCards / pageSize) : parseInt(numberOfCards / pageSize) + 1
   if(!Number.isInteger(parseInt(req.params.pageNumber)) || req.params.pageNumber < 1 || req.params.pageNumber > numberOfPages) return res.status(404).send('Not Found');
   const cards = await Card
      .find()
      .sort('-dateCreated')
      .skip((req.params.pageNumber - 1) * pageSize)
      .limit(pageSize);
   const data = {
      cards,
      numberOfPages
   }
   res.send(data);
});

//TODO: POST
router.post("/", auth, async (req, res) => {
   const userId = jwt.decode(req.headers['x-auth-token'])._id; 
   const card = new Card({
      image: req.body.image,
      type: req.body.type,
      context: req.body.context,
      englishTitle: req.body.englishTitle,
      vietnameseTitle: req.body.vietnameseTitle,
      example: req.body.example,
      user: userId
   });
   let user = await User.findById(userId);
   if(!user) return res.status(400).send('Invalid User');

   try {
      const result = await card.save();
      user.score += 500;
      user.save();
      res.send(result);
   } catch (ex) {
      let errorMessages = "";
      for (field in ex.errors) {
         errorMessages += ex.errors[field].message + "\n";
      }
      res.status(400).send(errorMessages);
   }
});

router.get('/search/:query', async (req, res) => {
   const regexp = new RegExp(req.params.query, 'i');
   const cards = await Card
      .find({
         $or: [
            {englishTitle: regexp},
            {vietnameseTitle: regexp},
            {type: regexp},
            {context: regexp}
         ]
      })
      .sort('-dateCreated');
   res.send(cards);
});

//TODO: UPDATE
router.put("/:cardId", auth, async (req, res) => {
   let card = await Card.findById(req.params.cardId);
   if (!card) return res.status(404).send("NOT FOUND.");

   card.englishTitle = req.body.englishTitle;
   card.vietnameseTitle = req.body.vietnameseTitle;
   card.image = req.body.image;
   card.example = req.body.example;
   card.type = req.body.type;
   card.context = req.body.context;
   card.isRemember = req.body.isRemember;

   try {
      const result = await card.save();
      res.send(result);
   } catch (ex) {
      let errorMessage = "";
      for (field in ex.errors) {
         errorMessage += ex.errors[field].message + '\n';
      }
      return res.status(400).send(errorMessage);
   }
});

//TODO: DELETE 
router.delete("/:cardId", [auth, admin], async (req, res) => {
   const result = await Card.findByIdAndRemove(req.params.cardId);
   if (!result) return res.status(404).send("NOT FOUND.");
   res.send(result);
});


module.exports = router;
