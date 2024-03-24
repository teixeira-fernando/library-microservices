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


  describe('Add new address', () => {
    test('successfully add address to existing user', async () => {
      
      const address = {
        'street': 'Street name',
        'postalCode': '12345',
        'city': 'City name',
        'country': 'country name',
      };

      const addressData = await service.AddNewAddress(existingUser.data.id, address);

      expect(addressData.data).toBeDefined();
      expect(addressData.data.id).toBeDefined();
      expect(addressData.data.street).toBeDefined();
      expect(addressData.data.postalCode).toBeDefined();
      expect(addressData.data.city).toBeDefined();
      expect(addressData.data.country).toBeDefined();
    });

    test('successfully add multiple address to existing user', async () => {
      
      const address = {
        'street': 'Street name',
        'postalCode': '12345',
        'city': 'City name',
        'country': 'country name',
      };

      const address2 = {
        'street': 'Street name 2',
        'postalCode': '12345',
        'city': 'City name 2',
        'country': 'country name 2',
      };

      await service.AddNewAddress(existingUser.data.id, address);
      const addressData = await service.AddNewAddress(existingUser.data.id, address2);

      expect(addressData.data).toBeDefined();
      expect(addressData.data.id).toBeDefined();
      expect(addressData.data.street).toBeDefined();
      expect(addressData.data.postalCode).toBeDefined();
      expect(addressData.data.city).toBeDefined();
      expect(addressData.data.country).toBeDefined();
    });

    test('fails when trying to add an Address to a non existing user', async () => {
      
      const address = {
        'street': 'Street name',
        'postalCode': '12345',
        'city': 'City name',
        'country': 'country name',
      };


      expect(service.AddNewAddress(new mongoose.Types.ObjectId(9999), address))
          .rejects
          .toThrow(new NotFoundError('User Not Found'));
    });

    test('fails when trying to add an incomplete Address', async () => {
      
      const address = {
        'street': 'Street name',
        'postalCode': '12345',
        'country': 'country name',
      };


      expect(service.AddNewAddress(existingUser.data.id, address))
          .rejects
          .toThrow(new ValidationError('Not all required fields were provided. Please check the input data'));
    });
  });
});
