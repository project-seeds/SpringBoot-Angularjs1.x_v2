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

    $rootScope.$on('$routeChangeStart', function(ev, next, curr) {
        AlertService.reset();

        if (next.$$route) {
            if (!curr || !curr.$$route) { //on page reload
                authenticateOnServer(LoginService, $rootScope, $location);
            } else {
                if ($rootScope.user) {
                    if (next.$$route.originalPath === '/login') {
                        $location.path('/');
                    }else if (next.$$route.originalPath === '/home'){
                    	var landingPage = LandingPageService.find(function(e){ return e.role === $rootScope.user.role }).link;
                    	console.log('opening landing page: ' + landingPage);
                    	landingPage && $location.path(landingPage);
                    }
                } else {
                	if (next.$$route.originalPath !== '/register'){
                		$location.path('/login');
                	}
                }
            }
        }
    });
}]);

function authenticateOnServer(LoginService, $rootScope, $location) {
    LoginService.login().then(
        function(user) {
            if (user) {
                $rootScope.user = user;
                if ($location.path() === '/login'){
            		$location.path('/');
            	}
                console.log('authenticated: ', user);
            } else {
                $rootScope.user = null;
                if ($location.path() !== '/register'){
            		$location.path('/login');
            	}
            }
        },
        function() {
        	$rootScope.user = null;
            if ($location.path() !== '/register'){
        		$location.path('/login');
        	}
        });
}
