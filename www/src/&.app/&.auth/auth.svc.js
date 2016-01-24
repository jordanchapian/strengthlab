angular.module('strengthlab.app.auth')
.factory('app.auth.svc', 
[
    '$http',
    '$q',
    '$rootScope',
    'AUTH_EVENTS',
    'ENDPOINT',
    'userService',
    'apiJwt',

function ($http, $q, $rootScope, AUTH_EVENTS, ENDPOINT, userService, apiJwt) {
    var authService = {};
    //attempt to get user credentials

    authService.login = function (credentials) {
        var defer = $q.defer();

        $http
            .post('http://' + ENDPOINT.appServer + '/api/auth/login', credentials)
            .then(function (res) {

                apiJwt.set(res.data);
                defer.resolve();

            }, function(e){ defer.reject(e.data); });

        return defer.promise;
    };

    authService.signup = function (credentials) {
        var defer = $q.defer();

        $http
            .post('http://' + ENDPOINT.appServer + '/api/auth/signup', credentials)
            .then(function (res) {

                //init the user service
                userService.init()
                .then(function(){
                    apiJwt.set(e.data);
                    defer.resolve();
                }, 
                function(e){
                    defer.reject(e);
                });

            }, function(){ defer.reject(); });

        return defer.promise;
    };

    authService.logout = function(){
        var defer = $q.defer();

        $http.post('http://' + ENDPOINT.appServer + '/api/auth/logout')
            .then(function(){//success
                //destroy the user service
                userService.reset();
                defer.resolve();
            },
            function(){//fail
                defer.reject();
            });

        return defer.promise;
    };

    return authService;
}]);
