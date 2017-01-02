'use strict';

angular.module('myApp')

.factory('AlertService', ['$rootScope', '$location', '$anchorScroll', function($rootScope, $location, $anchorScroll) {
    return {
    	success: function(options) {
    	    var msg = options.msg, link = options.link, timeMillis = options.timeMillis, callbackFn = options.callbackFn, next = options.next;
            var alert = {
                message: msg ? msg : 'success',
                type: 'success',
                link: link,
                id: new Date().getTime()
            }

            doAlert($rootScope, $location, $anchorScroll, alert, timeMillis, 1000, callbackFn, next)
        },
        error: function(options) {
        	var msg = options.msg, link = options.link, timeMillis = options.timeMillis, callbackFn = options.callbackFn, next = options.next;
            var alert = {
                message: msg ? msg : 'fail',
                type: 'danger',
                link: link,
                id: new Date().getTime()
            }
            doAlert($rootScope, $location, $anchorScroll, alert, timeMillis, 5000, callbackFn)
        },
        reset: function() {
        	$rootScope.alerts = [];
        }
    }
}]);

function doAlert($rootScope, $location, $anchorScroll, alert, timeMillis, defaultTimeMillis, callbackFn, next) {
    var alertId = /*'alert.' + */alert.id;

    $rootScope.alerts = [];
    $rootScope.alerts.push(alert);
    autoHide(alertId, (timeMillis ? timeMillis : defaultTimeMillis), callbackFn, next)
//    $location.hash(alertId);
    $anchorScroll();
}

function autoHide(alertId, timeMillis, callbackFn, next) {
    setTimeout(function() {
    	if (!next){
    		callbackFn && callbackFn();	
    	}else{
    		window.location.href = '#' + next;
    	}
//        $('#alert').fadeOut('slow');
        $('.alert').fadeOut('slow');
    }, timeMillis);
}