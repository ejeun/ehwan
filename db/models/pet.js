'use strict'

const Sequelize = require('sequelize')
const db = require('../db')

// console.log('this is db ', db)

module.exports = db.define('pets', {
  name: Sequelize.STRING,
  kind: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  points: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  }
})
