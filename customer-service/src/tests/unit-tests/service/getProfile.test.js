const CustomerService = require('../../../services/customer-service');
const dbHandler = require('../../in-memory-mongo');
const {NotFoundError, ValidationError} = require('../../../utils/app-errors');
const mongoose = require('mongoose');


describe('Customer Service', () => {
  const service = new CustomerService();
  let existingUser;

  const user = {
    'name': 'name',
    'email': 'test@test.com',
    'phone': '12345678',
    'password': '12345',
  };


  beforeAll(async () => {
    await dbHandler.connect();
  });

  beforeEach(async () => {
    existingUser = await service.SignUp(user);
  });


  afterEach(async () => {
    await dbHandler.clearDatabase();
  });


  afterAll(async () => await dbHandler.closeDatabase());


  describe('Get Profile by Id', () => {
    test('get profile from existing user', async () => {
      const profile = await service.GetProfile(existingUser.data.id);

      expect(profile.data).toBeDefined();
      expect(profile.data.id).toBeDefined();
      expect(profile.data.name).toBeDefined();
      expect(profile.data.email).toBeDefined();
      expect(profile.data.phone).toBeDefined();
    });

    test('get profile also returns addresses from the user', async () => {
      const profile = await service.GetProfile(existingUser.data.id);

      expect(profile.data).toBeDefined();
      expect(profile.data.id).toBeDefined();
      expect(profile.data.name).toBeDefined();
      expect(profile.data.email).toBeDefined();
      expect(profile.data.phone).toBeDefined();
    });

    test('returns an error when user is not found', async () => {
      expect(service.GetProfile(new mongoose.Types.ObjectId(9999)))
          .rejects
          .toThrow(new NotFoundError('User Not Found'));
    });
  });
});
