'use strict';

angular.module('myApp')

.controller('MenuCtrl', ['$rootScope', '$location', '$scope', 'LoginService', 'MenuService', '$routeParams',
                         function($rootScope, $location, $scope, LoginService, MenuService, $routeParams) {

    $scope.userMenu = []

    angular.forEach(MenuService, function(item) {
        if (item.role.indexOf($rootScope.user.role) >= 0) {
            $scope.userMenu.push(item)
        }
    });

    $scope.logout = function() {
        LoginService.logout().then(function() {
            $location.path('/login');
            $rootScope.user = null;
        })
    }
    
    $scope.isActive = function(item){
    	if ($location.path() == item.link){
    		return true;
    	}else if (item.subLinks){
    		var path = $location.path();
        	Object.keys($routeParams).forEach(function(k){path = path.replace($routeParams[k], '')});
        	return item.subLinks.indexOf(path) >= 0;
    	}
    }
}]);