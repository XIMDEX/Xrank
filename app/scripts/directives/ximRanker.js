'use strict';

angular.module('xRankApp')
.directive('ximRanker', function () {
	return {
		template: '<fieldset class="xim-rank"><legend>Please Vote</legend>'+
		'<span ng-repeat="puntuation in puntuations">'+
		'<input type="radio" id="rate_{{$index+1}}" ng-model="$parent.val" value="{{$index+1}}" ng-change="$parent.vote()">'+
		'<label for="rate_{{$index+1}}" ng-class="{checked: $index+1 <= $parent.val}"></label>'+
		'</span>'+
		'<style>'+
		'.xim-rank {};'+
		'</style>'+
		'</fieldset>',
		restrict: 'E',
		replace: true,
		scope: {},
		controller: ['$scope', '$attrs', '$http', '$window', '$rootScope', 'apiUrl', function ($scope, $attrs, $http, $window, $rootScope, apiUrl) {
			$scope.puntuations = [1,2,3,4,5];
			$scope.val = 0;
			$scope.url = $window.location.href;

			var refreshValorations = function(){
				$http.post(apiUrl+'/api/publication', {publication:$scope.url}).success(function(data){
					if (data && data.publication) {
						$scope.val = data.publication.user_val;
					}
				});
			};
			refreshValorations();
			$scope.vote = function(){
				if ($scope.url && $scope.val) {
					$http.post(apiUrl+'/api/vote', {publication:$scope.url, val: $scope.val}).success(function(data){
						if (data && data.notice)
							$rootScope.$broadcast('voted', {publication:$scope.url});
					});
				}
			};
		}]
	};
});
