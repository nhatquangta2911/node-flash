const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
   englishTitle: {
      type: String,
      required: true,
      maxlength: 50,
      trim: true
   },
   vietnameseTitle: {
      type: String,
      required: true,
      maxlength: 100,
      trim: true
   },
   image: {
      type: String,
      default: 'https://is5-ssl.mzstatic.com/image/thumb/Purple114/v4/cb/54/11/cb541151-1428-c3b6-1cfd-38d18a123c20/AppIcon-0-1x_U007emarketing-0-0-85-220-0-6.png/1200x630wa.png',
      match: /(jpg|png|gif)$/i
   },
   example: {
      type: String,
      minlength: 5,
      maxlength: 150,
      required: true, 
      trim: true
   },
   type: {
      type: String,
      default: 'WORD',
      uppercase: true,
      enum: ['NOUN','VERB', 'FILLER', 'ADJECTIVE', 'ADVERB', 'PHRASAL VERB', 'IDIOM', 'OTHERS', 'WORD', 'COMMON']
   },
   context: {
      type: String,
      trim: true,
      minlength: 2,
      maxlength: 50,
      default: 'General'
   },
   isRemember: {
      type: Boolean,
      default: false
   },
   dateCreated: {
      type: Date,
      default: Date.now
   }
});

module.exports.cardSchema = cardSchema;