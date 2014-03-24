'use strict';

angular.module('xRankApp')
.directive('ximRanker', function () {
	return {
		template: '<fieldset class="xim-ranker" ng-class="{\'xim-rank-pristine\': !val}"><legend>Please Vote</legend>'+
		'<span  ng-mouseleave="tempVal = 0">'+
		'<span ng-repeat="puntuation in puntuations" class="xim-rank-star" ng-mouseover="$parent.tempVal = puntuation" ng-class="{\'xim-rank-star-active\': tempVal && tempVal >= puntuation, \'xim-rank-star-full\': val >= puntuation}" ng-mousedown="vote(puntuation)"></span>'+
		'</span>'+
		'<style>'+
		'.xim-rank {};'+
		'</style>'+
		'</fieldset>',
		restrict: 'E',
		replace: true,
		scope: {},
		controller: ['$scope', '$attrs', '$http', '$window', '$rootScope', 'urlHelper', function ($scope, $attrs, $http, $window, $rootScope, urlHelper) {
			$scope.puntuations = [1,2,3,4,5];
			$scope.val = 0;
			$scope.tempVal = 0;
			$scope.url = urlHelper.normalizeUrl($window.location.href);

			var refreshValorations = function(){
				$http.post(urlHelper.apiUrl()+'/api/publication', {publication:$scope.url}, {withCredentials: true}).success(function(data){
					if (data && data.publication) {
						$scope.val = data.publication.user_val;
					}
				});
			};
			refreshValorations();
			$scope.vote = function(val){
				if ($scope.url && val) {
					$http.post(urlHelper.apiUrl()+'/api/vote', {publication:$scope.url, val: val}, {withCredentials: true}).success(function(data){
						if (data && data.notice)
							$rootScope.$broadcast('voted', {publication:$scope.url});
							$scope.val = val;
					});
				}
			};
		}]
	};
});
