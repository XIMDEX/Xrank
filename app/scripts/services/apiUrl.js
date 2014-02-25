'use strict';

angular.module('xRankApp')
  .provider('apiUrl', function() {

    this.url = "http://localhost:9000";

    this.$get = function() {
        var url = this.url;
        return url;
    };

    this.setUrl = function(url) {
        this.url = url;
    };
    
  });
