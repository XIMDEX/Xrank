'use strict';

angular.module('xRankApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/main'
      }).when('/pub_1', {
        templateUrl: 'partials/publication'
      }).when('/pub_2', {
        templateUrl: 'partials/publication'
      }).when('/pub_3', {
        templateUrl: 'partials/publication'
      }).when('/pub_4', {
        templateUrl: 'partials/publication'
      }).otherwise({
        redirectTo: '/'
      });  
    $locationProvider.html5Mode(true);
  });