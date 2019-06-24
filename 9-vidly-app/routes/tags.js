const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { tagSchema } = require('../model/tag');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const Tag = mongoose.model('Tag', tagSchema);

router.get('/', async (req, res) => {
   const tags = await Tag.find().sort('-name');
   res.send(tags);
})

router.post('/', async (req, res) => {
   const tag = new Tag({
      name: req.body.name,
      description: req.body.description
   });
   try {
      const result = await tag.save();
      res.send(result);
   } catch(ex) {
      let errorMessages = "";
      for (field in ex.errors) {
         errorMessages += ex.errors[field].message + "\n";
      }
      res.status(400).send(errorMessages);
   }
})

module.exports = router;
module.exports.tagSchema = tagSchema;