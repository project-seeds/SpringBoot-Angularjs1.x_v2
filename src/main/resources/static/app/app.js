'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute', 'pascalprecht.translate', 'ngMessages', 'ui.bootstrap', 'angular-loading-bar'
]).
config(['$routeProvider', '$httpProvider', '$translateProvider', function($routeProvider, $httpProvider, $translateProvider) {

    $routeProvider.otherwise({
        redirectTo: '/home'
    });

    $translateProvider.useStaticFilesLoader({
        prefix: 'messages/',
        suffix: '.json'
    });
    $translateProvider.preferredLanguage('ar');

    $httpProvider.defaults.headers.common['Accept-Language'] = 'ar';
    $httpProvider.interceptors.push('HttpInterceptor');

}]).run(['$rootScope', '$location', 'LoginService', 'AlertService', 'LandingPageService', 'PublicPagesService', 
    function($rootScope, $location, LoginService, AlertService, LandingPageService, PublicPagesService) {

    $rootScope.user = null;
    
    authenticateOnServer($rootScope, LoginService, function(){
    	redirect($rootScope, $location, LandingPageService, PublicPagesService, $location.path());
    	
        $rootScope.$on('$routeChangeStart', function(ev, next, curr) {
            AlertService.reset();
            next.$$route && redirect($rootScope, $location, LandingPageService, PublicPagesService, next.$$route.originalPath);
        });
    })
}]);

function redirect($rootScope, $location, LandingPageService, PublicPagesService, currentPath){

	if ($rootScope.user){
		if (currentPath === '/login' || PublicPagesService.isPublicPage(currentPath)){
	 		$location.path('/home');
	 	}else if (currentPath === '/home'){
	    	var landingPage = LandingPageService.find(function(e){ return e.role === $rootScope.user.role }).link;
	    	console.log('opening landing page: ' + landingPage);
	    	landingPage && $location.path(landingPage);
	    }	
	}else{
		if (!PublicPagesService.isPublicPage(currentPath)){
    		$location.path('/login');
    	}
	}
}

function authenticateOnServer($rootScope, LoginService, callback) {
    LoginService.login().then(
        function(user) {      // call success callback if current user is already authenticated before
            if (user) {
                $rootScope.user = user;
                console.log('authenticated: ', user);
                callback && callback();
            } else {
                $rootScope.user = null;
                callback && callback();
            }
        },
        function() {
        	$rootScope.user = null;
        	callback && callback();
        });
}
