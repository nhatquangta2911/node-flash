const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { cardSchema } = require("../model/card");
const auth = require("./auth");

const Card = mongoose.model("Card", cardSchema);

//TODO: GET
router.get("/", async (req, res) => {
   const cards = await Card.find().sort("-dateCreated");
   res.send(cards);
});

router.get("/:id", async (req, res) => {
   const card = await Card.findById(req.params.id);
   if (!card) return res.status(404).send("NOT FOUND");
   res.send(card);
});

//TODO: POST
router.post("/", auth, async (req, res) => {
   const card = new Card({
      englishTitle: req.body.englishTitle,
      vietnameseTitle: req.body.vietnameseTitle,
      image: req.body.image,
      example: req.body.example,
      type: req.body.type,
      context: req.body.context
   });
   try {
      const result = await card.save();
      res.send(result);
   } catch (ex) {
      let errorMessages = "";
      for (field in ex.errors) {
         errorMessages += ex.errors[field].message + "\n";
      }
      res.status(400).send(errorMessages);
   }
});

module.exports = router;
