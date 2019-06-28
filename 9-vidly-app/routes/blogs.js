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
      .populate('tags')
      .populate('user')
   res.send(blogs);
});

// router.get('/my', auth, async (req, res) => {
//    const blogs = await Blog.find({ 
//       user: {
//          _id: jwt.decode(req.headers['x-auth-token'])._id
//       }
//    }).populate('user').populate('tags').populate('comments');
//    res.send(blogs);
// });

router.get('/my/:id', async (req, res) => {
   const blogs = await Blog.find({ 
      user: {
         _id: req.params.id
      }
   }).populate('tags').populate('user');
   res.send(blogs);
});

router.get('/view/:id', async (req, res) => {
   let blog = await Blog.findById(req.params.id)
      .populate('tags')
      .populate('likes')
      .populate('user');
   if(!blog) return res.status(404).send("NOT FOUND.");
   res.send(blog);
   try {
      blog.views += 1;
      blog.save();
   } catch(ex) {
      for (field in ex.errors) {
         errorMessages += ex.errors[field].message + "\n";
      }
      res.status(400).send(errorMessages);
   }

});

router.get('/blog/:id', async (req, res) => {
   let blog = await Blog.findById(req.params.id)
      .populate('user')
      .populate('tags');
   if(!blog) return res.status(404).send("NOT FOUND.");
   res.send(blog);
});

router.post('/', auth, async (req, res) => {
   const userId = jwt.decode(req.headers['x-auth-token'])._id;
   const blog = new Blog({
      title: req.body.title,
      header: req.body.header,
      content: req.body.content,
      tags: req.body.tags,
      image: req.body.image,
      user: userId
   });
   let user = await User.findById(userId);
   if(!user) return res.status(400).send('Invalid user.');

   try {
      const result = await blog.save();
     
      user.score += 2000;
      user.save();
     
      req.body.tags && req.body.tags.length > 0 && req.body.tags.forEach(async (t) => {
         let tag = await Tag.findById(t._id);
         if(!tag) return res.status(404).send('Invalid Tags.');
         tag && tag.posts && tag.posts.push(result._id);
         tag && await tag.save();
      })

      res.send(result);
   } catch(ex) {
      let errorMessages = "";
      for (field in ex.errors) {
         errorMessages += ex.errors[field].message + "\n";
      }
      res.status(400).send(errorMessages);
   }
});

router.put('/blog/:id', auth, async (req, res) => {
   let blog = await Blog.findById(req.params.id);
   if(!blog) return res.status(404).send("NOT FOUND.");

   const userId = jwt.decode(req.headers['x-auth-token'])._id;
   if(blog.user._id != userId) return res.status(403).send("You can not edit this post." + blog.user._id + ' ' + userId);

   blog.title = req.body.title;
   blog.header = req.body.header;
   blog.content = req.body.content;
   blog.tags = req.body.tags;
   blog.image = req.body.image;
   blog.dateUpdated = Date.now();

   try {
      const result = await blog.save();
      res.send(result);
   } catch (ex) {
      let errorMessage = "";
      for (field in ex.errors) {
         errorMessage += ex.errors[field].message + '\n';
      }
      return res.status(400).send(errorMessage);
   }

   // if(blog.likes.includes(userId)) 
   //    blog.likes.pop(userId);
   // else 
   //    blog.likes.push(userId);
   // res.send(blog);
});

router.put('/like/:id', async (req, res) => {
   let blog = await Blog.findById(req.params.id);
   if(!blog) return res.status(404).send("NOT FOUND.");

   const userId = jwt.decode(req.headers['x-auth-token'])._id;
   // if(blog.user._id != userId) return res.status(403).send("You can not edit this post." + blog.user._id + ' ' + userId);

   if(req.body.isLike) {
      if(blog.likes.includes(userId))
         blog.likes.splice(blog.likes.indexOf(userId), 1);
      else
         blog.likes.push(userId);
   } 

   try {
      const result = await blog.save();
      res.send(result);
   } catch (ex) {
      let errorMessage = "";
      for (field in ex.errors) {
         errorMessage += ex.errors[field].message + '\n';
      }
      return res.status(400).send(errorMessage);
   }

   // if(blog.likes.includes(userId)) 
   //    blog.likes.pop(userId);
   // else 
   //    blog.likes.push(userId);
   // res.send(blog);
});

router.delete('/:id', auth, admin, async (req, res) => {
   const result = await Blog.findByIdAndRemove(req.params.id);
   if(!result) return res.status(404).send("NOT FOUND.");
   res.send(result);
});

module.exports = router;