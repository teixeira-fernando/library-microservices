const CustomerRepository = require("../database/repository/customer-repository");
const dbHandler = require('./in-memory-mongo');

describe("Customer Repository", () => {
    beforeAll(async () => await dbHandler.connect());


    afterEach(async () => await dbHandler.clearDatabase());


    afterAll(async () => await dbHandler.closeDatabase());

    // Which function
    describe("Create customer", () => {
      // Which Scenario we are testing
      test("validate customer creation", async () => {
        const repository = new CustomerRepository()

        var user = {
            "email": "test@test.com",
            "phone": "12345678",
            "salt": "123",
            "password": "12345"
        }

        var document = await repository.CreateCustomer(user)

        expect(document).toBeDefined()

      });
    });
  });
  