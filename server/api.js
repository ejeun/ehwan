'use strict'

const db = require('../db')
const api = module.exports = require('express').Router()

api
//   .get('/heartbeat', (req, res) => res.send({ok: true}))
  .use('/mail', require('./mail'))
  .use('/pets', require('./pets'))

// Send along any errors
api.use((err, req, res, next) => {
  res.status(500).send(err)
})

// No routes matched? 404.
api.use((req, res) => res.status(404).end())
