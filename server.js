'use strict';

var express = require('express'),
    path = require('path'),
    fs = require('fs'),
    https = require('https'),
    mongoose = require('mongoose');

/**
 * Main application file
 */

//Certificates
var privateKey  = fs.readFileSync('/etc/ssl/private/xfind.key', 'utf8');
var certificate = fs.readFileSync('/etc/ssl/certs/xfind.pem', 'utf8');

var credentials = {key: privateKey, cert: certificate};

// Default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Application Config
var config = require('./lib/config/config');

// Connect to database
var db = mongoose.connect(config.mongo.uri, config.mongo.options);

// Bootstrap models
var modelsPath = path.join(__dirname, 'lib/models');
fs.readdirSync(modelsPath).forEach(function (file) {
  require(modelsPath + '/' + file);
});

// Populate empty DB with sample data
if (process.env.NODE_ENV != 'production')
	require('./lib/config/dummydata');



var app = express();


// Express settings
require('./lib/config/express')(app);

// Routing
require('./lib/routes')(app);

//Start secure server
https.createServer(credentials, app).listen(config.port, function () {
  console.log('Express server listening on port %d in %s mode', config.port, app.get('env'));
});
// Start server
// app.listen(config.port, function () {
//   console.log('Express server listening on port %d in %s mode', config.port, app.get('env'));
// });

// Expose app
exports = module.exports = app;