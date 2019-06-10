//TODO: to populate DB, we need import Card model
const request = require('supertest');
const mongoose = require('mongoose');
const {
   cardSchema
} = require('../../model/card');
const {userSchema, generateAuthToken} = require('../../model/user');

let server;
const Card = mongoose.model('Card', cardSchema);
const User = mongoose.model('User', userSchema);

describe('/api/cards', () => {

   //TODO: Call this function before each test inside this test suite
   beforeEach(() => {
      server = require('../../index');
   });
   afterEach(async () => {
      server.close();
      await Card.remove({});
   });

   //TODO: One suite for each route
   describe('GET /', () => {
      it('should return all cards', async () => {
         await Card.collection.insertMany([{
               englishTitle: 'card1',
               vietnameseTitle: 'thetuvung1',
               image: 'img1.png',
               example: 'card1 in your area =))',
               type: 'IDIOM',
               context: 'for testing'
            },
            {
               englishTitle: 'card2',
               vietnameseTitle: 'thetuvung2',
               image: 'img2.png',
               example: 'card2 in your area =))',
               type: 'IDIOM',
               context: 'for testing'
            }
         ])
         const response = await request(server).get('/api/cards');
         // Make the assertion 
         // too general
         expect(response.status).toBe(200);
         expect(response.body.length).toBe(2);
         expect(response.body.some(c => c.englishTitle === 'card1')).toBeTruthy();
         expect(response.body.some(c => c.englishTitle === 'card2')).toBeTruthy();
      });

   });

   describe('GET /:id', () => {
      it('should return a card if valid id is passed', async () => {
         const id1 = mongoose.Types.ObjectId();
         const id2 = mongoose.Types.ObjectId();
         await Card.collection.insertMany([
            {
               _id: id1,
               englishTitle: 'card1',
               vietnameseTitle: 'thetuvung1',
               image: 'img1.png',
               example: 'card1 in your area =))',
               type: 'IDIOM',
               context: 'for testing'
            },
            {
               _id: id2,
               englishTitle: 'card2',
               vietnameseTitle: 'thetuvung2',
               image: 'img2.png',
               example: 'card2 in your area =))',
               type: 'IDIOM',
               context: 'for testing'
            }
         ]);
         const response = await request(server).get(`/api/cards/card/${id1}`);
         expect(response.status).toBe(200);
         expect(response.body).toHaveProperty('englishTitle', 'card1');
      });
      it('should return 404 if invalid id is passed', async () => {
         const response = await request(server).get('/api/cards/card/1');
         expect(response.status).toBe(404);
      });
   });

   describe('POST /', () => {
      it('should return 401 if client is not logged in', async () => {
         const response = await request(server)
            .post('/api/cards')
            .send(
               {
                  englishTitle: 'card',
                  vietnameseTitle: 'thetuvung',
                  image: 'img.png',
                  example: 'card in your area =))',
                  type: 'IDIOM',
                  context: 'for testing'
               }
            );
         expect(response.status).toBe(401);
      });
      it('should return 400 if card english title is more than 50 characters', async () => {
         const token = new User().generateAuthToken();
         const name = new Array(52).join('a');
         const response = await request(server)
            .post('/api/cards')
            .set('x-auth-token', token)
            .send(
               {
                  englishTitle: name,
                  vietnameseTitle: 'thetuvung',
                  image: 'img.png',
                  example: 'card in your area =))',
                  type: 'IDIOM',
                  context: 'for testing'
               }
         );
         expect(response.status).toBe(400);
      });
   });

});