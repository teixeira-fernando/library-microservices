const CustomerRepository = require('../../database/repository/customer-repository');
const dbHandler = require('../in-memory-mongo');
const {ValidationError} = require('../../utils/app-errors');

describe('Customer Repository', () => {
  const repository = new CustomerRepository();

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

      const document = await repository.CreateCustomer(user);
      expect(document).toBeDefined();
      expect(document.id).toBeDefined();
      expect(document.name).toBeDefined();
      expect(document.email).toBeDefined();
      expect(document.phone).toBeDefined();
    });

    test('throws an error when missing mandatory information - email', async () => {
      const user = {
        'name': 'name',
        'phone': '12345678',
        'password': '12345',
      };

      expect(repository.CreateCustomer(user))
          .rejects
          .toThrow(new ValidationError('customer validation failed: email: Path `email` is required.'));
    });

    test('throws an error when missing mandatory information - name', async () => {
      const user = {
        'email': 'test@test.com',
        'phone': '12345678',
        'password': '12345',
      };

      expect(repository.CreateCustomer(user))
          .rejects
          .toThrow(new ValidationError('customer validation failed: name: Path `name` is required.'));
    });

    test('throws an error when missing mandatory information - phone', async () => {
      const user = {
        'name': 'name',
        'email': 'test@test.com',
        'password': '12345',
      };

      expect(repository.CreateCustomer(user))
          .rejects
          .toThrow(new ValidationError('customer validation failed: phone: Path `phone` is required.'));
    });

    test('throws an error when missing mandatory information - password', async () => {
      const user = {
        'name': 'name',
        'email': 'test@test.com',
        'phone': '12345678',
      };

      expect(repository.CreateCustomer(user))
          .rejects
          .toThrow(new ValidationError('customer validation failed: password: Path `password` is required.'));
    });
  });

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
