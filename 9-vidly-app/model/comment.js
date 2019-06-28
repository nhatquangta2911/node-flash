const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
   content: {
      type: String, 
      required: true,
      maxlength: 1024,
      trim: true,
      uppercase: true
   },
   dateCreated: {
      type: Date,
      default: Date.now
   },
   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
   },
   post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',
      required: true
   }
});

module.exports.commentSchema = commentSchema;