const {CustomerRepository} = require('../database');
const {FormateData, GeneratePassword, GenerateSalt, GenerateSignature, ValidatePassword} = require('../utils');
const {ValidationError, APIError} = require('../utils/app-errors');

// All Business logic will be here
class CustomerService {
  constructor() {
    this.repository = new CustomerRepository();
  }

  async SignIn(userInputs) {
    const {email, password} = userInputs;

    const existingCustomer = await this.repository.FindCustomer({email});

    if (existingCustomer) {
      const validPassword = await ValidatePassword(password, existingCustomer.password, existingCustomer.salt);
      if (validPassword) {
        const token = await GenerateSignature({email: existingCustomer.email, _id: existingCustomer._id});
        return FormateData({id: existingCustomer._id, token, name: existingCustomer.name, phone: existingCustomer.phone, email: existingCustomer.email});
      }
    }

    return FormateData(null);
  }

  async SignUp(userInputs) {
    const {name, email, password, phone} = userInputs;

    if (name == null || email == null || password == null || phone == null) {
      throw new ValidationError(
          'Not all required fields were provided. Please check the signup data',
      );
    }

    // create salt
    const salt = await GenerateSalt();

    const userPassword = await GeneratePassword(password, salt);

    try {
      const existingCustomer = await this.repository.CreateCustomer({name, email, password: userPassword, phone, salt});
      const token = await GenerateSignature({email: email, _id: existingCustomer._id});
      return FormateData({id: existingCustomer._id, name: existingCustomer.name, email: email, password: password, phone: phone, token});
    } catch (error) {
      throw new APIError(
          'An error happenend when trying to create a new customer. Please try again', error);
    }
  }

  async AddNewAddress(_id, userInputs) {
    const {street, postalCode, city, country} = userInputs;

    if (street == null || postalCode == null || city == null || country == null) {
      throw new ValidationError(
          'Not all required fields were provided. Please check the input data',
      );
    }

    const addressResult = await this.repository.CreateAddress({_id, street, postalCode, city, country});

    return FormateData(addressResult);
  }

  async GetProfile(id) {
    const existingCustomer = await this.repository.FindCustomerById({id});
    return FormateData(existingCustomer);
  }
}

module.exports = CustomerService;
