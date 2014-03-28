'use strict';

angular.module('xRankApp')
  .provider('translate', function() {

  	this.strings = {
  		es: {
  			'Please vote': 'Valore este recurso',
  			'votes': 'votos'
  		}
  	}
    this.$get = function($window) {
        var lang = $window.document.documentElement.lang;
        if (this.strings[lang]) {
        	var strings = this.strings[lang];
        } else {
        	var strings = {};
        }
        return function(string) {
        	return strings[string] || string;
        }  
    };

    this.setTranslation = function(lang, translations) {
        this.strings[lang] = translations;
    };      
  });

angular.module('xRankApp')
    .filter('i18n', ['translate', function(translate){
        return function(string){
            return translate(string);
        }
}]);