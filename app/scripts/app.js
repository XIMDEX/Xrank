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
        templateUrl: 'partials/main',
        controller: 'MainCtrl'
      }).when('/pub_1', {
        templateUrl: 'partials/main',
        controller: 'MainCtrl'
      }).when('/pub_2', {
        templateUrl: 'partials/main',
        controller: 'MainCtrl'
      }).when('/pub_3', {
        templateUrl: 'partials/main',
        controller: 'MainCtrl'
      }).otherwise({
        redirectTo: '/'
      });
      
    $locationProvider.html5Mode(true);
  });