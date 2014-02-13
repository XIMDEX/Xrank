'use strict';

var mongoose = require('mongoose'),
  Publication = mongoose.model('Publication');

/**
 * Populate database with sample application data
 */

//Clear old things, then add things in
Publication.find({}).remove(function() {
  Publication.create({
    url: 'http://angularjs.com',
    votes: []
  }, {
    url: 'http://google.es',
    votes: [] 
  }, function() {
      console.log('--------Finished populating Publications--------');
    }
  );
});
