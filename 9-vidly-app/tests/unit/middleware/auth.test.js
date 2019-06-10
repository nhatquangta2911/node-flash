// const {userSchema} = require('../../../model/user');
// const auth = require('../../../middleware/auth');
// const mongoose = require('mongoose');
// const User = mongoose.model('User', userSchema);

// describe('auth middleware', () => {
//    it('should populate req.user with the payload of the valid JWT', () => {
//       const token = new User().generateAuthToken();
//       const req = {
//          header: jest.fn().mockReturnValue(token)
//       };
//       const res = {};
//       const next = jest.fn();
//       auth(req, res, next);
//       expect(req.user).toBeDefined();
//    });
// });