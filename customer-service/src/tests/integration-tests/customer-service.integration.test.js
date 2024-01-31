const request = require("supertest");
const { BASE_URL } = require('../../config/index');

describe("POST /signup", () => {

    it("should create a new customer", async () => {

    console.log(BASE_URL)

        const response = await request(BASE_URL).post("/signup").send({
            "name": "name",
            "email": "test@test.com",
            "phone": "12345678",
            "password": "12345"
        });
        expect(response.statusCode).toBe(200);
    });
  });