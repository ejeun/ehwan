'use strict'

const Sequelize = require('sequelize')
const db = require('../db')

module.exports = db.define('mails', {
  url: Sequelize.STRING,
  tags: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: [],
    get: function() {
      return this.getDataValue('tags').join(', ');
    }
  }
})
