'use strict';

angular.module('xRankApp')
  .directive('ximRank', function () {
    return {
      template: '<form name="create-pub" class="xim-rank">'+
    		'<span ng-repeat="puntuation in puntuations">'+
    			'<input type="radio" id="rate_{{$index}}" ng-model="$parent.val" value="{{$index}}" ng-change="$parent.vote()" ng-hide="$index == 0", ng-checked="$index == 0">'+
    			'<label for="rate_{{$index}}"></label>'+
    		'</span>'+
  			'<span>{{average}}/{{count}}</span>'+
  			'<style>'+
  				'.xim-rank {};'+
  			'</style>'+
  		'</form>',
      restrict: 'E',
      replace: true,
      scope: {},
      controller: ['$scope', '$http', '$window', function ($scope, $http, $window) {
	    $scope.puntuations = [1,2,3,4,5,6];
	    $scope.val = 0;
	    $scope.url = $window.location.href;
	    
	    var refreshValorations = function(){
	    	$http.post('api/publication', {publication:$scope.url}).success(function(data){
	    		console.log(data);
	    		if (data && data.publication) {
	    			$scope.average = data.publication.average;
	    			$scope.count = data.publication.count;
	    			$scope.val = data.publication.user_val;
	    		}
	    	});
	    };
	    refreshValorations();
	    $scope.vote = function(){
	    	if ($scope.url && $scope.val) {
		    	$http.post('api/vote', {publication:$scope.url, val: $scope.val}).success(function(data){
		    		if (data && data.notice)
		    			refreshValorations();
		    	});
		   }
	    };
	  }]
    };
  });
