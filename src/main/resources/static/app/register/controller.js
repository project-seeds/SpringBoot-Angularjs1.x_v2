'use strict';

angular.module('myApp')

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/register', {
        templateUrl: 'register/view.html',
        controller: 'RegisterCtrl'
    });
}])

.controller('RegisterCtrl', ['$scope', '$rootScope', '$location', 'RegisterService', 'AlertService', 'LoginServiceProxy', 
                             function($scope, $rootScope, $location, RegisterService, AlertService, LoginServiceProxy) {

    $scope.userInfo = {
        username: '',
        password: '',
        password2: ''
    };

    $scope.register = function() {
    	
    	if ($scope.userInfo.password !== $scope.userInfo.password2){
    		AlertService.error({msg: 'passwords.not.match'});
    	}else{
    		RegisterService.register($scope.userInfo).then(
    	            function() {
    	            	LoginServiceProxy.login($scope.userInfo);
    	            },
    	            function(error) {
    	                AlertService.error({msg: error.data.message});
    	                console.log(error.data.message);
    	            });
    	}
    }
}]);