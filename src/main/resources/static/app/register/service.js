'use strict';

angular.module('myApp')

.factory('RegisterService', ['$http', function($http) {
    return {
        register: function(userInfo) {
            return $http({
                method: 'POST',
                url: '/api/users/register',
                data: userInfo
            });
        }
    }
}]);