'use strict'
const status = require('http-status')

module.exports = (app, options) => {
  const {repo} = options

  app.get('/movies', (req, res, next) => {
    repo.getAllUsers.then(users => {
      res.status(status.OK).json(users)
    }).catch(next)
  })

  app.put('/movies', (req, res, next) => {
    repo.createUser.then(user => {
      res.status(status.OK).json(user)
    }).catch(next)
  })

  app.get('/movies/:id', (req, res, next) => {
    repo.getUserById(req.params.id).then(user => {
      res.status(status.OK).json(user)
    }).catch(next)
  })
}