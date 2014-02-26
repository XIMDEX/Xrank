'use strict';

angular.module('xRankApp')
  .provider('urlHelper', function() {

    this.apiUrl = "http://localhost:9000";

    this.$get = function() {
        var apiUrl = this.apiUrl;
        var pattern = this.pattern;
        var replacement = this.replacement;
        return {
            apiUrl: function(){
                return apiUrl;
            },
            normalizeUrl: function(url){
                if (pattern) {
                    console.log("replacing", pattern);
                    return url.replace(pattern, replacement || '');
                } 
                return url; 
            }
        };
    };

    this.setApiUrl = function(url) {
        this.apiUrl = url;
    };
    
    this.setUrlTrimPattern = function(pattern, replacement) {
        this.pattern = pattern;
        this.replacement = replacement;
    };
    
  });
