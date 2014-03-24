'use strict';

angular.module('xRankApp')
.directive('ximRank', ['urlHelper', function (urlHelper) {
	return {
		template: '<span><span ng-transclude ng-show="anchorHref"></span><span class="xim-rank">'+
			'<span ng-repeat="puntuation in puntuations" class="xim-rank-star" ng-class="{\'xim-rank-star-full\': puntuation <= average, \'xim-rank-star-half\': puntuation > average && puntuation-1 < average}"></span>'+
			'<span ng-if="count" class="xim-rank-average">{{average}} ({{count}} votes)</span>'+
		'</span>'+
		'</span>',
		restrict: 'E, A',
		transclude: 'element',
		replace: true,
		scope: {
			anchorHref: '@href'
		},
		controller: ['$scope', '$attrs', '$http', '$window', function ($scope, $attrs, $http, $window) {
			$scope.puntuations = [1, 2, 3, 4, 5];

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

		}],
		link: function postLink(scope, element, attrs) {
			var link = element.find('a')
			if (link.length) 
				if (link[0].href)
					scope.publicationUrl = urlHelper.normalizeUrl(link[0].href);
		}
	};
}]);
