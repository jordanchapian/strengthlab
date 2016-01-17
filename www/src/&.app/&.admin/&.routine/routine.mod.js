angular.module('strengthlab.app.admin.routine', [


])
.config(['$stateProvider',
function($stateProvider){

		$stateProvider
		.state('app.admin.routine',
		{
			url:'/routine',
			templateUrl:'./&.app/&.admin/&.routine/routine.tpl.html',
			// abstract:true
		});
		
}]);