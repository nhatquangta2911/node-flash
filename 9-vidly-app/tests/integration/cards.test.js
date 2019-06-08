const request = require('supertest');
let server;

describe('/api/cards', () => {

   //TODO: Call this function before each test inside this test suite
   beforeEach(() => { server = require('../../index'); });
   afterEach(() => { server.close(); });

   //TODO: One suite for each route
   describe('GET /', () => {
      it('should return all cards', async () => {
         const response = await request(server).get('/api/cards');
         // Make the assertion 
         expect(response.status).toBe(200);
      });
   });

});