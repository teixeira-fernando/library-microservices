const {CustomerModel, AddressModel} = require('../models');
const {NotFoundError} = require('../../utils/app-errors');

// Dealing with data base operations
class CustomerRepository {
  async CreateCustomer({name, email, password, phone, salt}) {
    const customer = new CustomerModel({
      name,
      email,
      password,
      salt,
      phone,
      address: [],
    });

    const customerResult = await customer.save();
    return customerResult;
  }

  async CreateAddress({_id, street, postalCode, city, country}) {
    const profile = await CustomerModel.findById(_id);

    if (profile) {
      const newAddress = new AddressModel({
        street,
        postalCode,
        city,
        country,
      });

      await newAddress.save();

      profile.address.push(newAddress);

      await profile.save();
      return newAddress;
    } else {
      throw new NotFoundError('User Not Found');
    }
  }

  async FindCustomer({email}) {
    const existingCustomer = await CustomerModel.findOne({email: email});
    return existingCustomer;
  }

  async FindCustomerById({id}) {
    const existingCustomer = await CustomerModel.findById(id).populate('address');
    return existingCustomer;
  }
}

module.exports = CustomerRepository;
