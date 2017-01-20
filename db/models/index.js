'use strict'

// Require our models. Running each module registers the model into sequelize

const Pet = require('./pet')
const Mail = require('./mail')

Mail.belongsTo(Pet)

module.exports = {Pet, Mail}
