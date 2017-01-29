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

}]).run(['$rootScope', '$location', 'LoginService', 'AlertService', 'LandingPageService', function($rootScope, $location, LoginService, AlertService, LandingPageService) {

    $rootScope.user = null;
    
    authenticateOnServer($rootScope, LoginService, function(){
    	redirect($rootScope, $location, LandingPageService, $location.path());
    	
        $rootScope.$on('$routeChangeStart', function(ev, next, curr) {
            AlertService.reset();
            next.$$route && redirect($rootScope, $location, LandingPageService, next.$$route.originalPath);
        });
    })
}]);

function redirect($rootScope, $location, LandingPageService, currentPath){
    
    var PUBLIC_PAGES = ['/register'];

	if ($rootScope.user){
		if (currentPath === '/login' || PUBLIC_PAGES.some(function(e){return e == currentPath})){
	 		$location.path('/home');
	 	}else if (currentPath === '/home'){
	    	var landingPage = LandingPageService.find(function(e){ return e.role === $rootScope.user.role }).link;
	    	console.log('opening landing page: ' + landingPage);
	    	landingPage && $location.path(landingPage);
	    }	
	}else{
		if (!PUBLIC_PAGES.some(function(e){return e == currentPath})){
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
