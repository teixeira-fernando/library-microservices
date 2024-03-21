const CustomerService = require('../../../services/customer-service');
const dbHandler = require('../../in-memory-mongo');
const {NotFoundError} = require('../../../utils/app-errors');
const mongoose = require('mongoose');



describe('Customer Service', () => {
  const service = new CustomerService();
  let existingUser;
  

  beforeAll(async () => {
    await dbHandler.connect();

    const user = {
      'name': 'name',
      'email': 'test@test.com',
      'phone': '12345678',
      'password': '12345',
    };

    existingUser = await service.SignUp(user);
  });


  afterEach(async () => await dbHandler.clearDatabase());


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
      expect(addressData.data.address[0].street).toBeDefined();
      expect(addressData.data.address[0].postalCode).toBeDefined();
      expect(addressData.data.address[0].city).toBeDefined();
      expect(addressData.data.address[0].country).toBeDefined();
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
  });
});
