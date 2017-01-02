'use strict';

angular.module('myApp')

.factory('EditWeeklistService', ['$http', function($http) {
    return {
        save: function(plan) {
            return $http({
                method: 'PUT',
                url: '/api/plans',
                data: plan
            });
        },
        get: function(planId) {
            return $http({
                method: 'GET',
                url: '/api/plans/' + planId 
            });
        },
        searchItems : function(term) {
			return $http({
				method : 'GET',
				url : '/api/plans/items/' + term
			});
		}
    }
}]);