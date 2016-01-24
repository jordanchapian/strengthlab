angular.module('strengthlab.dataservice')
.service('userService',[

'$state', '$timeout','$http','$q','ENDPOINT', 'apiJwt',
function($state, $timeout, $http, $q,ENDPOINT, apiJwt){
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

		//if we do not have an apiJWT key stored, we can't do anything...
		if(!apiJwt.exists()){
			defer.reject();
			return defer.promise;
		}

		//ensure we have a valid token
		apiJwt.isValid()
		.then(function(isValid){
			//if we do not have a valid token, we cannot proceed...
			if(!isValid) return defer.reject();

			//reach out and resolve the user
			$http({
				method:'GET',
				url:'http://' + ENDPOINT.appServer + '/api/user',
				params:{
					api_token:apiJwt.get(),
					me:true
				}
			})
			.success(function(response){
				isInit = true;
				userDatum = response;
				defer.resolve();
			})
			.error(function(err){
				defer.reject(err);
			});
		});

		return defer.promise;
	};

	this.isActive = function(){
		return isInit;
	};

}]);