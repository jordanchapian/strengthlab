angular.module('strengthlab.app.login')
.factory('strengthlab.app.login.auth.svc', 
[
    '$http',
    '$q',
    '$rootScope',
    'AUTH_EVENTS',
    'ENDPOINT',
    'userService',

function ($http, $q, $rootScope, AUTH_EVENTS, ENDPOINT, userService) {
    var authService = {};
    //attempt to get user credentials

    authService.login = function (credentials) {
        var defer = $q.defer();

        $http
            .post('http://' + ENDPOINT.appServer + '/api/auth/login', credentials)
            .then(function (res) {

                //init the user service
                userService.init()
                .then(function(){
                    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                    defer.resolve(res);
                }, 
                function(){
                    defer.reject();
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

                //$broadcast logout event
                $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);

                defer.resolve();
            },
            function(){//fail
                defer.reject();
            });

        return defer.promise;
    };

    return authService;
}]);
