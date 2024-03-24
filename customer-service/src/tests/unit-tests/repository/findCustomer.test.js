const CustomerRepository = require('../../../database/repository/customer-repository');
const dbHandler = require('../../in-memory-mongo');
const {ValidationError} = require('../../../utils/app-errors');

describe('Customer Repository', () => {
  const repository = new CustomerRepository();

  beforeAll(async () => await dbHandler.connect());


  afterEach(async () => await dbHandler.clearDatabase());


  afterAll(async () => await dbHandler.closeDatabase());

  describe('Find Customer', () => {
    test('successfully find existing customer with valid email', async () => {
      // arrange
      const userData = {
        'name': 'name',
        'email': 'test@email.com',
        'phone': '12345678',
        'password': '12345',
      };

      await repository.CreateCustomer(userData);

      // act
      const document = await repository.FindCustomer(userData);

      // assert
      expect(document).toBeDefined();
      expect(document.id).toBeDefined();
      expect(document.name).toBeDefined();
      expect(document.password).toBeDefined();
    });

    test('returns nothing when user does not exists', async () => {
      const email = 'nonexistinguser@email.com';

      const document = await repository.FindCustomer(email);

      expect(document).toBeNull();
    });
  });
});
