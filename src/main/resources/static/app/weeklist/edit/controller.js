'use strict';

angular.module('myApp')

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/weeklist/edit/:id', {
        templateUrl: 'weeklist/edit/view.html',
        controller: 'EditWeeklistCtrl'
    });
}])

.controller('EditWeeklistCtrl', ['$scope', '$rootScope', '$location', 'EditWeeklistService', 'AlertService', '$routeParams',
                             function($scope, $rootScope, $location, EditWeeklistService, AlertService, $routeParams) {

	$scope.type = 'edit';
    $scope.list = [{}];
    
    $scope.addNew = function(){
    	//TODO save the list in the browser
    	$scope.list.push({});
    	console.log($scope.list);
    }
    
    $scope.remove = function(index){
    	$scope.list.splice(index, 1);
    }
    
    $scope.save = function(){
    	$scope.plan.items = $scope.list;
    	EditWeeklistService.save($scope.plan).then(function(){
    		AlertService.success({next: '/weeklist', timeMillis: 500});
    	}, function(){
    		AlertService.error();
    	});
    }
    
    function get(planId){
    	EditWeeklistService.get(planId).then(function(response){
    		$scope.plan = response.data[0];
    		$scope.list = response.data[1];
    		
    		$scope.weekNo = function (){
    			return $scope.plan.weekNo;
    		};
    	}, function(){
    		AlertService.error();
    	});
    }
    $scope.get = get;
    
    $scope.searchItems = function(val) {
        return EditWeeklistService.searchItems(val).then(function(response){
          return response.data;
        });
      };
    
    get($routeParams.id);
    
}]);