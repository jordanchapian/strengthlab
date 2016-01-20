angular.module('strengthlab.app.admin.routine', [


])
.config(['$stateProvider',
function($stateProvider){

		$stateProvider
		.state('app.admin.routine',
		{

			url:'/routine',
			// abstract:true
			views: {
        'tab-routine': {
          templateUrl:'./&.app/&.admin/&.routine/routine.tpl.html',
          controller: 'app.admin.routine.ctrl'
        }
      }
		});
		
}]);