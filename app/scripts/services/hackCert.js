'use strict';

angular.module('xRankApp')
    .factory('hackCert', ['$window', '$location', '$cookies', function($window, $location, $cookies) {
		if($window.location.href.indexOf('?cert_accepted=') != -1) {
			$cookies.cert_accepted = 'true';
		}
		if (!$cookies.cert_accepted) {
			$window.location.href = 'https://xfind.irmc.gob.es:9000/cert?origin_url='+window.location.href;
		}
	}]);