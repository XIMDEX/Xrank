'use strict';

angular.module('xRankApp')
  .controller('MainCtrl', ['$scope', '$http', '$cookies', function ($scope, $http, $cookies) {
    $scope.publications = [
    	'http://mongodb.com',
    	'http://nodejs.com',
    	'http://angularjs.com'
    ];
    // $http.get('api/votes').success(function(data){
    // 	console.log(data);
    // });
    $scope.vote = function(pub, val){
    	
    	if (pub && val) {
	    	$http.post('api/vote', {data:{publication:pub, val: val}}).success(function(data){
	    		$scope.refreshPubs();
	    	});
	   }
    };
    $scope.refreshPubs = function(){
    	$http.get('api/publications').success(function(publications){
	    	if (publications){
	    		$scope.pubs = publications;
	    	}
	    });	
    };
  }]);
