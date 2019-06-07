const mongoose = require('mongoose');
const {userSchema} = require('../../../model/user');
const jwt = require('jsonwebtoken');
const config = require('config');

describe('user.generateAuthToken', () => {
   it('should return a valid JWT ', () => {
      const payload = {
         _id: new mongoose.Types.ObjectId().toHexString( ),
         isAdmin: true,
         email: 'shawn@gmail.com'
      }
      const User = mongoose.model('User', userSchema);
      const user = new User(payload);
      const token = user.generateAuthToken();
      const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
      expect(decoded).toMatchObject(payload);
   });
});