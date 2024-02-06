const CustomerService = require('../../services/customer-service');
const dbHandler = require('../in-memory-mongo');
const {ValidationError} = require('../../utils/app-errors');

describe('Customer Service', () => {
  const service = new CustomerService();

  beforeAll(async () => await dbHandler.connect());


  afterEach(async () => await dbHandler.clearDatabase());


  afterAll(async () => await dbHandler.closeDatabase());

  describe('Create customer', () => {
    test('successful customer creation', async () => {
      const user = {
        'name': 'name',
        'email': 'test@test.com',
        'phone': '12345678',
        'password': '12345',
      };

      const {data} = await service.SignUp(user);

      expect(data).toBeDefined();
      expect(data.id).toBeDefined();
      expect(data.name).toBeDefined();
      expect(data.email).toBeDefined();
      expect(data.phone).toBeDefined();
      expect(data.password).toBeDefined();
    });

    test('throws and error when missing information is provided - name', async () => {
      const user = {
        'email': 'test@test.com',
        'phone': '12345678',
        'password': '12345',
      };

      expect(service.SignUp(user))
          .rejects
          .toThrow(new ValidationError('Not all required fields were provided. Please check the signup data'));
    });

    test('throws and error when missing information is provided - email', async () => {
      const user = {
        'name': 'name',
        'phone': '12345678',
        'password': '12345',
      };

      expect(service.SignUp(user))
          .rejects
          .toThrow(new ValidationError('Not all required fields were provided. Please check the signup data'));
    });

    test('throws and error when missing information is provided - phone', async () => {
      const user = {
        'name': 'name',
        'email': 'test@test.com',
        'password': '12345',
      };

      expect(service.SignUp(user))
          .rejects
          .toThrow(new ValidationError('Not all required fields were provided. Please check the signup data'));
    });

    test('throws and error when missing information is provided - password', async () => {
      const user = {
        'name': 'name',
        'email': 'test@test.com',
        'phone': '12345678',
      };

      expect(service.SignUp(user))
          .rejects
          .toThrow(new ValidationError('Not all required fields were provided. Please check the signup data'));
    });
  });

  describe('Signin customer', () => {
    test('successful signin when user exists and valid credentials are provided', async () => {
      const user = {
        'name': 'name',
        'email': 'test@test.com',
        'phone': '12345678',
        'password': '12345',
      };

      await service.SignUp(user);

      const {data} = await service.SignIn(user);

      expect(data).toBeDefined();
      expect(data.id).toBeDefined();
      expect(data.name).toBeDefined();
      expect(data.email).toBeDefined();
      expect(data.phone).toBeDefined();
      expect(data.token).toBeDefined();
    });

    test('error Data not found when user does not exist', async () => {
      const userdoesnotexist = {
        'name': 'name',
        'email': 'nonexistinguser@test.com',
      };

      expect(service.SignIn(userdoesnotexist))
          .rejects
          .toThrow(new Error('Data Not found!'));
    });
  });
});
