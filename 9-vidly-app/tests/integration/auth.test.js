const request = require('supertest');
const {userSchema} = require('../../model/user');
const {cardSchema} = require('../../model/card');
const mongoose = require('mongoose');
const User = mongoose.model('User', userSchema);
const Card = mongoose.model('Card', cardSchema);

let server;

describe('auth middleware', () => {
   let token;
   
   beforeEach(() => {
      server = require('../../index');
      token = new User().generateAuthToken();
   });

   afterEach(async () => {
      server.close();
      await Card.deleteMany({});
   });
  
   const exec = async () => {
      return await request(server)
         .post('/api/cards')
         .set('x-auth-token', token)
         .send({
            englishTitle: 'CARD001',
            vietnameseTitle: 'thetuvung1',
            image: 'img1.png',
            example: 'card1 in your area =))',
            type: 'IDIOM',
            context: 'for testing'
         })
   };

   it('should return 401 if no token is provided', async () => {
      token = '';
      const response = await exec();
      expect(response.status).toBe(401);
   });
   it('should return 400 if no token is invalid', async () => {
      token = 'a';
      const response = await exec();
      expect(response.status).toBe(400);
   });
   it('should return 200 if token is valid', async () => {
      const response = await exec();
      expect(response.status).toBe(200);
   });
});