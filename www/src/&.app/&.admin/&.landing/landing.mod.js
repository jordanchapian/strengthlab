angular.module('strengthlab.app.admin.landing', [


])
.config(['$stateProvider',
function($stateProvider){

		$stateProvider
		.state('app.admin.landing',
		{
			url:'/landing',
			templateUrl:'./&.app/&.admin/&.landing/landing.tpl.html',
			// abstract:true
		});
		
}]);
;