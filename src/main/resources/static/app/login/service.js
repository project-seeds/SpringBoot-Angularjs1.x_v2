'use strict';

angular.module('myApp')

.factory('LoginService', ['$http', 'Base64Service', function($http, Base64Service) {
    return {
        login: function(credentials) {
            if (credentials) {
                var auth = 'Basic ' + Base64Service.encode(credentials.username + ':' + credentials.password);
            }
            return $http({
                method: 'GET',
                url: '/api/users/login',
                headers: credentials ? {
                    'Authorization': auth
                } : {}
            }).then(function(response) {
                return response.data;
            });
        },
        logout: function() {
            return $http.post('/logout')
        }
    }
}]);