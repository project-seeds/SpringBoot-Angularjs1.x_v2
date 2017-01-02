'use strict';

angular.module('myApp')

.factory('LoginServiceProxy', ['$rootScope', '$location', 'LoginService', 'AlertService', function($rootScope, $location, LoginService, AlertService) {
    return {
        login: function(credentials) {
        	LoginService.login(credentials).then(
                    function(user) {
                        $rootScope.user = user;
                        $location.path('/')
                        console.log('authenticated: ', user);
                    },
                    function(error) {
                        $rootScope.user = null;
                        AlertService.error({msg: error.data.message});
                        console.log(error.data.message);
                    });
        }
    }
}]);
