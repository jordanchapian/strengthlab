angular.module('strengthlab.dataservice')
.service('dataservice.exerciseCollection.svc',
['$q', 'ENDPOINT', 'userService',
function($q, ENDPOINT, userService){
	// var routines = [];

	// var localDB = new PouchDB('exercises');
	// var remoteDB = new PouchDB(ENDPOINT.couchDB+'/exercises');

	// localDB.sync(remoteDB, {
	// 	live: true,
	//   retry: true,
	// 	filter: 'exercises/by_agent',
	// 	query_params:{"agent": userService.getId()}
	// });

	// console.log(userService.getId(), 'test')
	this.init = function(){
		var defer = $q.defer();

		defer.resolve();
		
		return defer.promise;
	};



}]);