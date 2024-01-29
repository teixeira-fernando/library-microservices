const CustomerRepository = require("../../database/repository/customer-repository");
const dbHandler = require('../in-memory-mongo');
const {ValidationError} = require('../../utils/app-errors')

describe("Customer Repository", () => {

    const repository = new CustomerRepository()

    beforeAll(async () => await dbHandler.connect());


    afterEach(async () => await dbHandler.clearDatabase());


    afterAll(async () => await dbHandler.closeDatabase());

    describe("Create customer", () => {
      test("successful customer creation", async () => {

        var user = {
            "name": "name",
            "email": "test@test.com",
            "phone": "12345678",
            "password": "12345"
        }

        var document = await repository.CreateCustomer(user)
        expect(document).toBeDefined()
      });

      test("throws an error when missing mandatory information - email", async () => {

        var user = {
          "name": "name",
          "phone": "12345678",
          "password": "12345"
        }

        expect(repository.CreateCustomer(user))
        .rejects
        .toThrow(new ValidationError('customer validation failed: email: Path `email` is required.'));

      });

      test("throws an error when missing mandatory information - name", async () => {

        var user = {
          "email": "test@test.com",
          "phone": "12345678",
          "password": "12345"
        }

        expect(repository.CreateCustomer(user))
        .rejects
        .toThrow(new ValidationError('customer validation failed: name: Path `name` is required.'));

      });

      test("throws an error when missing mandatory information - phone", async () => {

        var user = {
          "name": "name",
          "email": "test@test.com",
          "password": "12345"
        }

        expect(repository.CreateCustomer(user))
        .rejects
        .toThrow(new ValidationError('customer validation failed: phone: Path `phone` is required.'));

      });

      test("throws an error when missing mandatory information - password", async () => {

        var user = {
          "name": "name",
          "email": "test@test.com",
          "phone": "12345678",
        }

        expect(repository.CreateCustomer(user))
        .rejects
        .toThrow(new ValidationError('customer validation failed: password: Path `password` is required.'));

      });


    });
  });
  