angular.module('strengthlab.dataservice')
.service('userService',[

'$state', '$timeout','$http','$q','ENDPOINT',
function($state, $timeout, $http, $q,ENDPOINT){
	var self = this,
		isInit = false,
		userDatum;
	
	this.getId = function(){
		return userDatum._id;
	};
	
	this.getEmail = function(){
		if(!isInit)return;
		
		return userDatum.email;
	};

	this.init = function(user){
		var defer = $q.defer();

		// $http.get('http://' + ENDPOINT.appServer + '/api/user?me=true', { withCredentials:true })
		// .success(function(user){
		// 	//set initial state
		// 	userDatum = user;
		// 	isInit = true;
		// 	defer.resolve(self);
		// })
		// .error(function(){
		// 	defer.reject();
		// });
	
		userDatum = {
			_id:'23233124214dasda21e2',
			email:'jchapian@utk.edu'
		};
		isInit = true;

		defer.resolve();
		
		return defer.promise;
	};

	this.isActive = function(){
		return isInit;
	};

}]);