'use strict'

const db = require('../db/db')
const Mail = db.model('mails')
const Pet = db.model('pets')

module.exports = require('express').Router()

  .get('/', (req, res, next) =>
    Mail.findAll()
    .then(mails => res.json(mails))
    .catch(next))

  .get('/:petId', (req, res, next) =>
    Mail.findAll({
      where: {
        petId: +req.params.petId
      },
      include: [Pet]
    })
    .then(allMail => res.send(allMail))
    .catch(next))

  .post('/', (req, res, next) =>
    Mail.create(req.body)
    .then(mail => res.status(201).json(mail))
    .catch(next))
