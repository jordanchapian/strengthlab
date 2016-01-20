angular.module('strengthlab.dataservice')
.service('dataservice.routineCollection.svc',
['$q', 'ENDPOINT', 'userService',
function($q, ENDPOINT, userService){
	var routines = [];

	var localDB = new PouchDB('routines');
	var remoteDB = new PouchDB(ENDPOINT.couchDB+'/routines');
	console.log('test');

	this.sync = function(){

	};



}]);