const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require('config');

const userSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20,
      trim: true
   },
   email: {
      type: String,
      unique: true,
      required: true,
      maxlength: 255
      // match: /[a-z0-9]{3,15}\.*[a-z0-9]{3,15}@[a-z]{2,}(\.[a-z]{1,}){1,3}/g
   },
   password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1024
   },
   avatarPicture: {
      type: String,
      default: 'https://library.kissclipart.com/20180922/eve/kissclipart-icon-full-name-clipart-computer-icons-avatar-icon-f6cf26ff2213f36e.png',
      match: /(jpg|png|gif|jpeg)$/i
   },
   score: {
      type: Number,
      default: 0
   },
   isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function() {
   const token = jwt.sign(
      {  _id: this._id,
         name: this.name,
         email: this.email,
         isAdmin: this.isAdmin,
         avatarPicture: this.avatarPicture
      }, //TODO: payload
      config.get("jwtPrivateKey"), // digital signature
      { expiresIn: '1h'}
   );
   return token;
};

module.exports.userSchema = userSchema;