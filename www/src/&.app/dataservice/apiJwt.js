angular.module('strengthlab.dataservice')
.service('apiJwt',[

'$state', '$http','$q','ENDPOINT',
function($state, $http, $q,ENDPOINT){
	
	this.exists = function(){
		return localStorage.getItem('apiJWT') !== null
	};

	this.get = function(){
		return localStorage.getItem('apiJWT');
	};

	this.set = function(value){
		localStorage.setItem('apiJWT', value);
	};

	this.renew = function(){
		var defer = $q.defer();

		//if it doesn't even exist locally, it is not valid...
		if(!this.exists()){
			defer.reject();
			return defer.promise;
		}

		//we need to reach out to our api to determine if this is a valid token
		$http({
			method:'GET',
			url:'http://' + ENDPOINT.appServer + '/api/auth/renewToken',
			params:{
				api_token:this.get()
			}
		})
		.success(function(response){
			// defer.resolve(response);
		})
		.error(function(err){
			// defer.reject(err);
		});

		return defer.promise;
	};
	
	this.isValid = function(){
		var defer = $q.defer();

		//if it doesn't even exist locally, it is not valid...
		if(!this.exists()){
			defer.reject();
			return defer.promise;
		}

		//we need to reach out to our api to determine if this is a valid token
		$http({
			method:'GET',
			url:'http://' + ENDPOINT.appServer + '/api/auth/tokenValid',
			params:{
				api_token:this.get()
			}
		})
		.success(function(response){
			defer.resolve(response);
		})
		.error(function(err){
			defer.reject(err);
		});

		return defer.promise;
	};

}]);