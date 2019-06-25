const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
   title: {
      type: String,
      required: true,
      maxlength: 500,
      trim: true,
      
   },
   header: {
      type: String,
      required: true,
      maxlength: 1024,
      trim: true
   },
   content: {
      type: String,
      required: true,
      trim: true
   },
   views: {
      type: Number,
      default: 0,
      min: 0
   },
   likes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
   }],
   tags: {
      type: [{
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Tag'
      }],
      validate: {
         validator: function(value) {
            return value && value.length > 0;
         },
         message: 'A Post should have at least one tag.'
      }
   },
   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
   },
   dateCreated: {
      type: Date,
      default: Date.now
   },
   dateUpdated: {
      type: Date,
      default: Date.now
   },
   image: {
      type: String,
      default: 'http://www.onecity.in/wp-content/uploads/2019/05/blog-banner.png'
   }
});

module.exports.blogSchema = blogSchema;