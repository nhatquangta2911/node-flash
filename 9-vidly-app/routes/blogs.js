const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { blogSchema } = require('../model/blog');
const { userSchema } = require('../model/user');
const { tagSchema } = require('../model/tag');
const validateObjectId = require('../middleware/validateObjectId');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const jwt = require('jsonwebtoken');

const Blog = mongoose.model('Blog', blogSchema);
const User = mongoose.model('User', userSchema);
const Tag  = mongoose.model('Tag', tagSchema);

router.get('/', async (req, res) => {
   const blogs = await Blog.find()
      .sort('-dateUpdated')
      .populate('user')
      .populate('tags');
   res.send(blogs);
});

router.post('/', auth, async (req, res) => {
   const userId = jwt.decode(req.headers['x-auth-token'])._id;
   const blog = new Blog({
      title: req.body.title,
      header: req.body.header,
      content: req.body.content,
      tags: req.body.tags,
      user: userId
   });
   let user = await User.findById(userId);
   if(!user) return res.status(400).send('Invalid user.');

   try {
      const result = await blog.save();
      user.score += 2000;
      user.save();
      res.send(result);
   } catch(ex) {
      let errorMessages = "";
      for (field in ex.errors) {
         errorMessages += ex.errors[field].message + "\n";
      }
      res.status(400).send(errorMessages);
   }
});

module.exports = router;