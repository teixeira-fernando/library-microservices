const dbHandler = require('../in-memory-mongo');
const request = require('supertest');
const express = require('express');
const expressApp = require('../../express-app');

describe('Customer API', () => {
  const app = express();
  expressApp(app);

  beforeAll(async () => await dbHandler.connect());


  afterEach(async () => await dbHandler.clearDatabase());


  afterAll(async () => await dbHandler.closeDatabase());

  /* Testing the API endpoints. */
  describe('POST /signup', () => {
    test('returns 200 and create a new customer', async () => {
      const res = await request(app).post('/signup').send({
        'name': 'name',
        'email': 'test@test.com',
        'phone': '12345678',
        'password': '12345',
      });
      expect(res.statusCode).toBe(200);
      expect(res.body.id).toBeDefined();
      expect(res.body.name).toBeDefined();
      expect(res.body.password).toBeDefined();
      expect(res.body.phone).toBeDefined();
      expect(res.body.email).toBeDefined();
      expect(res.body.token).toBeDefined();
    });

    test('return 400 when missing request data', async () => {
      const res = await request(app).post('/signup').send({
        'email': 'test@test.com',
        'phone': '12345678',
        'password': '12345',
      });
      expect(res.statusCode).toBe(400);
      expect(res.body.errorName).toBe('BAD REQUEST');
      expect(res.body.message).toBe('Not all required fields were provided. Please check the signup data');
    });
  });
});
