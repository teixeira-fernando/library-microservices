const CustomerService = require('../../../services/customer-service');
const dbHandler = require('../../in-memory-mongo');
const {NotFoundError} = require('../../../utils/app-errors');

describe('Customer Service', () => {
  const service = new CustomerService();

  beforeAll(async () => await dbHandler.connect());


  afterEach(async () => await dbHandler.clearDatabase());


  afterAll(async () => await dbHandler.closeDatabase());

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
        'password': '12345',
      };

      expect(service.SignIn(userdoesnotexist))
          .rejects
          .toThrow(new Error('Data Not found!'));
    });

    test('error invalid password', async () => {
      const user = {
        'name': 'name',
        'email': 'test@test.com',
        'phone': '12345678',
        'password': '12345',
      };

      await service.SignUp(user);

      expect(service.SignIn({email: user.email, password: '9999'}))
          .rejects
          .toThrow(new NotFoundError('Data Not found!'));
    });
  });
});
