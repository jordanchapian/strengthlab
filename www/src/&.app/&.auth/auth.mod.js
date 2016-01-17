angular.module('strengthlab.app.auth', [])
.config(['$stateProvider',
function($stateProvider){

		$stateProvider
		.state('app.auth',
		{
			url:'/auth',
			templateUrl:'./&.app/&.auth/auth.tpl.html',
			abstract:true
		})
		.state('app.auth.login',
		{
			url:'/login',
			controller:'app.auth.login.ctrl',
			templateUrl:'./&.app/&.auth/&.login/login.tpl.html'
		})
		.state('app.auth.signup',
		{
			url:'/signup',
			controller:'app.auth.signup.ctrl',
			templateUrl:'./&.app/&.auth/&.signup/signup.tpl.html'
		});
		
}]);
;