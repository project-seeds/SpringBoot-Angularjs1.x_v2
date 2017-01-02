'use strict';

angular.module('myApp')

.factory('AddWeeklistService', ['$http', '$q', function($http, $q) {
    return {
        save: function(plan) {
            return $http({
                method: 'POST',
                url: '/api/plans',
                data: plan
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