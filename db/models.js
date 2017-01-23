'use strict'

const Sequelize = require('sequelize')
const db = require('./db')

const Mail = db.define('mails', {
  url: Sequelize.STRING,
  tags: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: [],
  }
})

const Pet = db.define('pets', {
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

Mail.belongsTo(Pet)

module.exports = {Pet, Mail}
