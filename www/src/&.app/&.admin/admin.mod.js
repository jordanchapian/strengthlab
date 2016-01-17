angular.module('strengthlab.app.admin', [

	'strengthlab.app.admin.landing',
	'strengthlab.app.admin.routine',
	'strengthlab.app.admin.start'

])
.config(['$stateProvider',
function($stateProvider){

		$stateProvider
		.state('app.admin',
		{
			url:'/admin',
			templateUrl:'./&.app/&.admin/admin.tpl.html',
			abstract:true
		});
		
}]);
;