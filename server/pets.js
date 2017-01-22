'use strict'

const db = require('../db/db')
const Pet = db.model('pets')
const Mail = db.model('mails')

module.exports = require('express').Router()

  .get('/', (req, res, next) => {
    console.log('ur looking at all the cuties')
    Pet.findAll()
    .then(pets => res.json(pets))
    .catch(next)
  })

  .post('/', (req, res, next) => {
    console.log('routes been hit with ', req.body)
    Pet.create(req.body)
    .then(pet => res.json(pet))
    .catch(next)
  })

  .get('/:id', (req, res, next) =>
    Pet.findById(req.params.id)
    .then(pet => res.json(pet))
    .catch(next))

  .put('/:id', (req, res, next) =>
    Pet.update(req.body)
    .then(updatedPet => res.status(204).send(updatedPet))
    .catch(next))

  .get('/:id/mail', (req, res, next) =>
    Mail.findAll({
      where: {
        petId: +req.params.id
      },
      include: [Pet]
    })
    .then(allMail => res.send(allMail))
    .catch(next))
