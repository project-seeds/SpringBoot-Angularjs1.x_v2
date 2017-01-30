'use strict';

angular.module('myApp')

.factory('HttpInterceptor', ['$rootScope', '$q', '$location', 'AlertService', 'PublicPagesService', 
                             function($rootScope, $q, $location, AlertService, PublicPagesService) {
	 return {
		   'responseError': function(rejection) {
		     
			  if (rejection.status == 401 && !PublicPagesService.isPublicPage($location.path()) ){
				  
				  console.log('server returned error code 401; session timed-out; redirecting to login page');
				  $rootScope.user = null;
				  $location.path('/login');
			  }
			  
			  if (rejection.status == 403){
				  console.log('server returned error code 403; access denied');
				  // TODO my show some global access denied page
			  }
			   
		      return $q.reject(rejection);
		    }
		  };
}]);