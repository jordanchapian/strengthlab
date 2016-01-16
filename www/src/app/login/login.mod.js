angular.module('strengthlab.app.login', [])
.config(['$stateProvider',
function($stateProvider){

		$stateProvider
		.state('app.login',
		{
			url:'/login',
			controller:'login.ctrl',
			templateUrl:'./app/login/login.tpl.html',
			resolve:{
				
			},
			data:{

			}
		});
		
}]);
;