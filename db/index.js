'use strict'
// const debug = require('debug')('sql')
const chalk = require('chalk')
const Sequelize = require('sequelize')

const db = require('./db')

// pull in our models
require('./models')

// Syncing all the models at once. This promise is used by main.js.
var syncedDbPromise = db.sync()

syncedDbPromise.then(function () {
  console.log(chalk.green('Sequelize models synced to PostgreSQL'))
})

module.exports = syncedDbPromise
