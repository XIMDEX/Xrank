'use strict';

var api = require('./controllers/api'),
    index = require('./controllers');

/**
 * Application routes
 */
module.exports = function(app) {

  // Server API Routes
  app.post('/api/vote', api.vote);
  app.post('/api/publication', api.publication);
  app.get('/test', index.test);
  // All other routes to use Angular routing in app/scripts/app.js
  app.configure('development', function(){
  	app.get('/partials/*', index.partials);
  	app.get('/*', index.index);
  })
  
};