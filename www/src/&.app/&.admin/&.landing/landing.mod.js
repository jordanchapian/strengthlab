angular.module('strengthlab.app.admin.landing', [


])
.config(['$stateProvider',
function($stateProvider){

		$stateProvider
		.state('app.admin.landing',
		{

			url:'/landing',
			
			// abstract:true
			views: {
        'tab-landing': {
          templateUrl:'./&.app/&.admin/&.landing/landing.tpl.html',
          // controller: 'HomeTabCtrl'
        }
      }
		});
		
}]);
;