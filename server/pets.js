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

  .put('/:id', (req, res, next) => {
    console.log(req.params.id, req.body)

    Pet.update(req.body,  {
      where: {id: req.params.id},
      returning: true
    })
    .then(updated => {
      // console.log(updated)
      console.log('updated this ', updated[1])
      res.send(updated[1][0])})
    .catch(next)})

  .get('/:id/mail', (req, res, next) =>
    Mail.findAll({
      where: {
        petId: +req.params.id
      },
      include: [Pet]
    })
    .then(allMail => res.send(allMail))
    .catch(next))
