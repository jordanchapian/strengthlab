angular.module('strengthlab.app', 
[
    'strengthlab.app.auth',
    'strengthlab.dataservice',
    'strengthlab.constant'
    // 'strengthlab.app.admin'
])
.config(['$urlRouterProvider', '$stateProvider', 
function($urlRouterProvider, $stateProvider){

	//set your default route logic... (Could be based on login sessions, user modes, ... etc)
	$urlRouterProvider.otherwise('/auth/login');

	var loginRedirected = false;
	
    $stateProvider
    .state('app', {
        templateUrl:'./&.app/app.tpl.html',
        abstract:true,
        resolve:{
            //ensure logged in.
            userInit:['$http','userService','$state',
            function($http, userService, $state){ 
                if(loginRedirected)return false;

                if(userService.isActive()){
                    return userService;
                }
                else {
                    return userService.init()
                            .then(function(){},//no worries
                            function(){ //error
                                loginRedirected = true;

                                var hashlocation = window.location.hash.split('?')[0];

                                if(hashlocation === "#/auth") return;

                                $state.go('app.auth');
                            });
                }
            }]
        }
    });

}]);