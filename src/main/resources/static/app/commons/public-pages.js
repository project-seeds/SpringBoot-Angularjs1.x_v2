'use strict';

angular.module('myApp')

.factory('PublicPagesService', [function(){
	
	var PUBLIC_PAGES = ['/register']
	
	return {
		isPublicPage: function(route){
			return PUBLIC_PAGES.some(function(e){return e == route});
		}
	}
}]);