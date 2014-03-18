'use strict';

angular.module('xRankApp')
.directive('ximRank', ['urlHelper', function (urlHelper) {
	return {
		template: '<span><a href="{{anchorHref}}" ng-transclude ng-if="publicationUrl"></a><span class="xim-rank">'+
			'<span ng-repeat="puntuation in puntuations" class="xim-rank-star xim-rank-{{puntuation}}" ng-class="{checked: checked(puntuation)}"></span>'+
			'<span ng-if="count">{{average}} ({{count}} votes)</span>'+
		'</span>'+
		'</span>',
		restrict: 'E, A',
		transclude: 'element',
		replace: true,
		scope: {
			anchorHref: '@href'
		},
		controller: ['$scope', '$attrs', '$http', '$window', function ($scope, $attrs, $http, $window) {
			$scope.puntuations = [];
			for (var i=1; i<=5; i+=0.5) {
				$scope.puntuations.push(i);
			}
			var refreshValorations = function(publication){
				$http.post(urlHelper.apiUrl()+'/api/publication', {publication: publication}).success(function(data){
					if (data && data.publication) {
						$scope.average = parseFloat(data.publication.average);
						$scope.count = data.publication.count;
					}
				});
			};
			$scope.$watch('publicationUrl', function(newVal, oldVal){
				if (newVal)
					refreshValorations(newVal);
			});
			if (!$attrs.href) {    
				$scope.publicationUrl = urlHelper.normalizeUrl($window.location.href);
			}
			$scope.$on('voted', function(event, data){
				if (data.publication === $scope.publicationUrl)
					refreshValorations($scope.publicationUrl);
			});
			$scope.checked = function(puntuation) {
				if (puntuation <= $scope.average) {
					return true;
				} else {
					if ($scope.average % 1 !== 0) {
						if (Math.floor(puntuation) === Math.floor($scope.average)){
							return true;	
						}
						else {
							return false;
						}
					} else {
						return false;
					}		
				}	    	
			}

		}],
		link: function postLink(scope, element, attrs) {
			var link = element.find('a')
			if (link.length) 
				if (link[0].href)
					scope.publicationUrl = urlHelper.normalizeUrl(link[0].href);
		}
	};
}]);
