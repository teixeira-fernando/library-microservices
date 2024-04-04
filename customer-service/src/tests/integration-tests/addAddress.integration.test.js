const dbHandler = require('../in-memory-mongo');
const request = require('supertest');
const express = require('express');
const expressApp = require('../../express-app');

describe('Customer API', () => {
  const app = express();
  expressApp(app);

  let existingUser;

  const user = {
    'name': 'name',
    'email': 'test@test.com',
    'phone': '12345678',
    'password': '12345',
  };

  beforeAll(async () => await dbHandler.connect());

  beforeEach(async () => {
    existingUser = await request(app).post('/signup').send(user);
  });


  afterEach(async () => await dbHandler.clearDatabase());


  afterAll(async () => await dbHandler.closeDatabase());


  /* Testing the API endpoints. */
  describe('POST /address', () => {
    test('returns 200 and create a new address', async () => {
      const res = await request(app).post('/login').send({
        'email': user.email,
        'password': user.password,
      });
      
      const addressResponse = await request(app).post('/address')
          .set({Authorization: 'Bearer '+res.body.token})
          .send({
            'street': 'Street name',
            'postalCode': '12345',
            'city': 'City name',
            'country': 'country name',
          });
      expect(res.statusCode).toBe(200);
      expect(res.body.id).toBeDefined();
      expect(res.body.name).toBeDefined();
      expect(res.body.phone).toBeDefined();
      expect(res.body.email).toBeDefined();
      expect(res.body.token).toBeDefined();

      expect(addressResponse.body).toBeDefined();
      expect(addressResponse.body.street).toBeDefined();
      expect(addressResponse.body.postalCode).toBeDefined();
      expect(addressResponse.body.city).toBeDefined();
      expect(addressResponse.body.country).toBeDefined();
    });
  });
});
