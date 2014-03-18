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
    'link': '/-ides-/pub_2'
  },
  {
    'title': 'Publication 3 EN',
    'link': '/en/pub_3'
  },
  {
    'title': 'Publication 3 ES',
    'link': '/es/pub_3'
  }
  ];

  $scope.isActive = function(route) {
    return route === $location.path();
  };
});
