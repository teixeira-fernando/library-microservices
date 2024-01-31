const app = require("../../index")
const request = require("supertest");
const { PORT } = require('../../config/index');


require("dotenv").config();

//const URL = process.env.APPLICATION_URL + ':' + process.env.PORT

describe("POST /signup", () => {

    it("should create a new customer", async () => {

        console.log(request(app).post("/signup").url)
        const response = await request(app).post("/signup").send({
            "name": "name",
            "email": "test@test.com",
            "phone": "12345678",
            "password": "12345"
        });
        console.log("URLaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa:")
        expect(response.statusCode).toBe(200);
    });
  });