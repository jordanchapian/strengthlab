angular.module('strengthlab.dataservice')
.factory('dataservice.routine.svc',
[],
function(){

	function Routine(routineDatum){

	}

	return function(routineDatum){
		return new Routine(routineDatum);
	};
	
});