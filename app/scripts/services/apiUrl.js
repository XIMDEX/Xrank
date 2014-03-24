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
                    var match = pattern.exec(url);
                    if (match) {
                        return url.replace(match[1],replacement || '');
                    } else {
                        return url;
                    }
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
