'use strict';

angular.module('xRankApp')
  .directive('ximRank', function () {
    return {
      template: '<form name="create-pub" class="form-horizontal" ng-repeat="pub in publications">
    		<span>{{pub}}</span><br/>
    		<label class="radio-inline"><input type="radio" ng-model="puntuation" value="1">1</label>
    		<label class="radio-inline"><input type="radio" ng-model="puntuation" value="2">2</label>
    		<label class="radio-inline"><input type="radio" ng-model="puntuation" value="3">3</label>
    		<label class="radio-inline"><input type="radio" ng-model="puntuation" value="4">4</label>
    		<label class="radio-inline"><input type="radio" ng-model="puntuation" value="5">5</label>
    		<button class="btn btn-primary" type="button" ng-click="vote(pub, puntuation)" ng-disabled="!puntuation">Vote</button>
  		</form>',
      restrict: 'E',
      replace: true,
      controller: ['$scope', '$http', '$cookies', function ($scope, $http, $cookies) {
	    $scope.publications = [
	    	'http://mongodb.com',
	    	'http://nodejs.com',
	    	'http://angularjs.com'
	    ];
	    // $http.get('api/votes').success(function(data){
	    // 	console.log(data);
	    // });
	    $scope.vote = function(pub, val){
	    	
	    	if (pub && val) {
		    	$http.post('api/vote', {data:{publication:pub, val: val}}).success(function(data){
		    		$scope.refreshPubs();
		    	});
		   }
	    };
	    $scope.refreshPubs = function(){
	    	$http.get('api/publications').success(function(publications){
		    	if (publications){
		    		$scope.pubs = publications;
		    	}
		    });	
	    };
	  }],
      link: function postLink(scope, element, attrs) {
        element.text('this is the ximRank directive');
      }
    };
  });
