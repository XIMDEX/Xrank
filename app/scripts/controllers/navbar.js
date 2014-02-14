'use strict';

angular.module('xRankApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [
    	{
      		'title': 'Home',
      		'link': '/'
    	},
    	{
      		'title': 'Publication 1',
      		'link': '/pub_1'
    	},
    	{
      		'title': 'Publication 2',
      		'link': '/pub_2'
    	},
    	{
      		'title': 'Publication 3',
      		'link': '/pub_3'
    	},
    ];
    
    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
