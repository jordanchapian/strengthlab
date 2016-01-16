angular.module('strengthlab.app.auth', [])
.config(['$stateProvider',
function($stateProvider){

		$stateProvider
		.state('app.auth',
		{
			url:'/auth',
			controller:'app.auth.ctrl',
			templateUrl:'./&.app/&.auth/auth.tpl.html',
			resolve:{
				
			},
			data:{

			}
		});
		
}]);
;