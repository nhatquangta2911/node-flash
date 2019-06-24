const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { tagSchema } = require('../model/tag');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const validateObjectId = require('../middleware/validateObjectId');

const Tag = mongoose.model('Tag', tagSchema);

router.get('/', async (req, res) => {
   const tags = await Tag.find().sort('-name');
   res.send(tags);
})

router.get('/tag/:id', validateObjectId, async (req, res) => {
   const tag = await Tag.findById(req.params.id);
   if(!tag) 
      return res.status(404).send("NOT FOUND.");
   else 
      res.send(tag);
});

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

router.put('/:id', auth, async (req, res) => {
   let tag = await Tag.findById(req.params.id);
   if(!tag) return res.status(404).send("NOT FOUND.");

   tag.name = req.body.name;
   tag.description = req.body.description;

   try {
      const result = await tag.save();
      res.send(result);
   } catch(ex) {
      let errorMessage = "";
      for (field in ex.errors) {
         errorMessage += ex.errors[field].message + '\n';
      }
      return res.status(400).send(errorMessage);
   }
});

router.delete('/:id', auth, admin, async (req, res) => {
   const result = await Tag.findByIdAndRemove(req.params.id);
   if(!result) return res.status(404).send("NOT FOUND.");
   res.send(result);
});

module.exports = router;
module.exports.tagSchema = tagSchema;