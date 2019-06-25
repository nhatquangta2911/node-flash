const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { commentSchema } = require('../model/comment');
const { userSchema } = require('../model/user');
const { blogSchema } = require('../model/blog');
const validateObjectId = require('../middleware/validateObjectId');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const jwt = require('jsonwebtoken');

const Comment = mongoose.model('Comment', commentSchema);
const User = mongoose.model('User', userSchema);
const Blog = mongoose.model('Blog', blogSchema);

router.get('/', async (req, res) => {
   const comments = await Comment.find()
      .sort('-dateCreated');
   res.send(comments);
});

router.post('/', auth, async (req, res) => {
   const userId = jwt.decode(req.headers['x-auth-token'])._id;
   const comment = new Comment({
      content: req.body.content,
      user: userId,
      post: req.body.post
   });
   let user = await User.findById(userId);
   if(!user) return res.status(400).send('Invalid user.');

   try {
      const result = await comment.save();   
      user.score += 250;
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

router.get('/post/:id', validateObjectId, async (req, res) => {
   const comments = await Comment.find({ 
      post: {
         _id: req.params.id
      }   
   }).populate('user');
   res.send(comments);
});

module.exports = router;

