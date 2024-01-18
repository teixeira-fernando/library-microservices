'use strict'

const repository = (connection) => {
  const {db, ObjectID} = connection

  const getAllUsers = () => {
    return new Promise((resolve, reject) => {
      const users = []
      const cursor = collection.find({}, {name: 1, id: 1})
      const addUsers = (movie) => {
        users.push(movie)
      }
      const sendUsers = (err) => {
        if (err) {
          reject(new Error('An error occured fetching all users, err:' + err))
        }
        resolve(users.slice())
      }
      cursor.forEach(addUsers, sendUsers)
    })
  }

  const getUserById = (userId) => {
    return new Promise((resolve, reject) => {
      const query = {_id: new ObjectID(userId)}
      const projection = {_id: 1, name: 1}
      const response = (err, user) => {
        if (err) {
          reject(new Error('An error occuered retrieving a user, err: ' + err))
        }
        resolve(user)
      }
      db.collection('users').findOne(query, projection, response)
    })
  }
  
  const createUser = (user) => {
    return new Promise((resolve, reject) => {
      const payload = {
        id: user.id,
        name: user.name,
        address: {
            street: user.address.street,
            number: user.address.number,
            postcode: user.address.postcode,
            country: user.address.country
        },
        phone: user.phone,
        created_at: user.created_at,
        updated_at: user.updated_at
      }

      db.collection('users').insertOne(payload, (err, user) => {
        if (err) {
          reject(new Error('An error occurred when creating a user, err:' + err))
        }
        resolve(payload)
      })
    })
  }

  const disconnect = () => {
    db.close()
  }

  return Object.create({
    getUserById,
    createUser,
    disconnect
  })
}

const connect = (connection) => {
  return new Promise((resolve, reject) => {
    if (!connection) {
      reject(new Error('connection db not supplied!'))
    }
    resolve(repository(connection))
  })
}

module.exports = Object.assign({}, {connect})