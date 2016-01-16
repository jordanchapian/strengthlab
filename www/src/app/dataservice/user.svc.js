angular.module('strengthlab.dataservice')
.service('userService',[

'$state', '$timeout','$http','$q',
function($state, $timeout, $http, $q){
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

		// $http.get('/api/user?me=true')
		// .success(function(user){
		// 	//set initial state
		// 	userDatum = user;
		// 	isInit = true;
		// 	defer.resolve(self);
		// })
		// .error(function(){
		// 	defer.reject();
		// });
	
		defer.resolve();
		return defer.promise;
	};

	this.isActive = function(){
		return isInit;
	};

}]);