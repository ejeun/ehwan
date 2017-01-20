'use strict'
/* eslint-disable global-require */

const chalk = require('chalk')
const express = require("express")
const volleyball = require("volleyball")
const bodyParser = require('body-parser')
const path = require('path')
// const socketio = require('socket.io')

const app = express()

// logging middleware
app.use(volleyball)

// We'll store the whole session in a cookie
// app.use(require('cookie-session') ({
//     name: 'session',
//     keys: [process.env.SESSION_SECRET || 'an insecure secret key'],
//   }))

// body parsing middleware
app.use(bodyParser.urlencoded({ extended: true })) // for HTML form submits
app.use(bodyParser.json()) // would be for AJAX requests

 // Serve static files from ../public
app.use(express.static(path.join(__dirname, '..', 'public')))

// Serve our api
// app.use('/api', require('./api'))

// Requires in ./db/index.js -- which returns a promise that represents
// sequelize syncing its models to the postgreSQL database.
// const startDb = require('./db');

// Send index.html for anything else.
app.get('/*', (_, res) => res.sendFile(path.join(__dirname, '..', 'public', 'index.html')))

const startServer = function () {

  const PORT = process.env.PORT || 8000;
  app.listen(PORT, function () {
    // console.log(chalk.magenta(`--- Started HTTP Server for ${pkg.name} ---`))
    console.log(chalk.blue('Server started on port', PORT))
    });
}

startServer()

// startDb
// .then(createApplication)
// .then(startServer)
// .catch(function (err) {
//     console.error(chalk.red(err.stack));
//     process.exit(1);
// });

module.exports = app
