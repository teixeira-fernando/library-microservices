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

  describe('POST /login', () => {
    test('returns 200 and signin the user', async () => {
      const createUser = await request(app).post('/signup').send({
        'name': 'name',
        'email': 'test@test.com',
        'phone': '12345678',
        'password': '12345678',
      });

      const res = await request(app).post('/login').send({
        'email': 'test@test.com',
        'password': '12345678',
      });
      expect(res.statusCode).toBe(200);
      expect(res.body.id).toBeDefined();
      expect(res.body.name).toBeDefined();
      expect(res.body.phone).toBeDefined();
      expect(res.body.email).toBeDefined();
      expect(res.body.token).toBeDefined();
    });

    test('returns 404 when the user does not exists', async () => {
      const res = await request(app).post('/login').send({
        'email': 'nonexistinguser@test.com',
        'password': '12345',
      });
      expect(res.statusCode).toBe(404);
    });
  });
});
