angular.module('xRankApp')
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/main'
      }).when('/pub_1', {
        templateUrl: 'partials/publication'
      }).when('/-ides-/pub_2', {
        templateUrl: 'partials/publication'
      }).when('/en/pub_3', {
        templateUrl: 'partials/publication'
      }).when('/es/pub_3', {
        templateUrl: 'partials/publication'
      }).otherwise({
        redirectTo: '/'
      });  
    $locationProvider.html5Mode(true);
  });