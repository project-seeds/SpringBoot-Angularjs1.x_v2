'use strict';

angular.module('myApp')

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/weeklist', {
        templateUrl: 'weeklist/view.html',
        controller: 'WeeklistCtrl'
    });
}])

.controller('WeeklistCtrl', ['$scope', '$rootScope', '$location', 'WeeklistService', 'AlertService',
                             function($scope, $rootScope, $location, WeeklistService, AlertService) {
	
	$scope.list = [];
 
	function list(){
		WeeklistService.list().then(function(response){
			$scope.list = response.data;
		}, function(){
			AlertService.error();
		});
	}
	$scope.list = list;
	
	$scope.remove = function(planId){
		WeeklistService.remove(planId).then(function(){
			list();
		}, function(){
			AlertService.error();
		});
	}
	
	list();
}]);