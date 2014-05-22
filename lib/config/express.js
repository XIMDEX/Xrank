'use strict';

var express = require('express'),
    path = require('path'),
    cors = require('cors'),
    config = require('./config');

/**
 * Express configuration
 */
module.exports = function(app) {
  app.configure('development', function(){
    app.use(require('connect-livereload')());

    // Disable caching of scripts for easier testing
    app.use(function noCache(req, res, next) {
      if (req.url.indexOf('/scripts/') === 0) {
        res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.header('Pragma', 'no-cache');
        res.header('Expires', 0);
      }
      next();
    });

    app.use(express.static(path.join(config.root, '.tmp')));
    app.use(express.static(path.join(config.root, 'app')));
    app.use(express.errorHandler());
    app.set('views', config.root + '/app/views');
  });

  // Cors allow domain whitelist
  // var whitelist = ['https://domain-1.org', 'http://localhost:9000'];
  // var corsOptions = {
  //   origin: function(origin, callback){
  //     var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
  //     callback(null, originIsWhitelisted);
  //   }
  // };
  
  app.configure('production', function(){
    app.use(cors({
      origin: 'https://allowed-domain.org'
    }));
  });

  app.configure(function(){
    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'html');
    app.use(express.logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    // Router needs to be last
    app.use(app.router);
  });
};
