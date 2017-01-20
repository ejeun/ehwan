'use strict'

const Sequelize = require('sequelize')
const db = require('../../db')

module.exports = db.define('clarifai', {
  url: Sequelize.STRING,

}
