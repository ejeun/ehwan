'use strict'

const db = require('../db/db')
const Pet = db.model('pets')

module.exports = require('express').Router()

  .get('/', (req, res, next) =>
    Pet.findAll()
    .then(pets => res.json(pets))
    .catch(next))

  .post('/', (req, res, next) =>
    Pet.create(req.body)
    .then(pet => res.status(201).json(pet))
    .catch(next))
