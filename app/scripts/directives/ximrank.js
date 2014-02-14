'use strict';

angular.module('xRankApp')
  .directive('ximRank', function () {
    return {
      template: '<fieldset name="create-pub" class="xim-rank"><legend>Please Vote</legend>'+
			'<span ng-repeat="puntuation in puntuations">'+
    			'<input type="radio" id="rate_{{$index}}" ng-model="$parent.val" value="{{$index}}" ng-change="$parent.vote()">'+
    			'<label for="rate_{{$index}}" ng-class="{checked: $index < $parent.val}"></label>'+
    		'</span>'+
  			'<span>{{average}} ({{count}} votes)</span>'+
  			'<style>'+
  				'.xim-rank {};'+
  			'</style>'+
  		'</fieldset>',
      restrict: 'E',
      replace: true,
      scope: {},
      controller: ['$scope', '$attrs', '$http', '$window', function ($scope, $attrs, $http, $window) {
	    $scope.puntuations = [1,2,3,4,5];
	    $scope.val = 0;
	    $scope.url = $window.location.href;
	    
	    var refreshValorations = function(){
	    	$http.post($attrs.ximUrl+'/api/publication', {publication:$scope.url}).success(function(data){
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
		    	$http.post($attrs.ximUrl+'/api/vote', {publication:$scope.url, val: $scope.val}).success(function(data){
		    		if (data && data.notice)
		    			refreshValorations();
		    	});
		   	}
	    };
	  }]
    };
  });
