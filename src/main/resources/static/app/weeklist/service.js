'use strict';

angular.module('myApp')

.factory('WeeklistService', ['$http', function($http) {
    return {
        list: function() {
            return $http({
                method: 'GET',
                url: '/api/plans'
            });
        },
        remove: function(planId) {
            return $http({
                method: 'DELETE',
                url: '/api/plans/' + planId
            });
        }
    }
}]);