'use strict'

const db = require('../db/db')
const Mail = db.model('mails')

module.exports = require('express').Router()

  .get('/', (req, res, next) =>
    Mail.findAll()
    .then(mails => res.json(mails))
    .catch(next))

  .post('/', (req, res, next) =>
    Mail.create(req.body)
    .then(mail => res.status(201).json(mail))
    .catch(next))
