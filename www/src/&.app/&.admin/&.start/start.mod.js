angular.module('strengthlab.app.admin.start', [


])
.config(['$stateProvider',
function($stateProvider){

		$stateProvider
		.state('app.admin.start',
		{
			url:'/start',
			templateUrl:'./&.app/&.admin/&.start/start.tpl.html',
			// abstract:true
		});
		
}]);
;