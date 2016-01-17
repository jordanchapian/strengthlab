angular.module('strengthlab.app.auth')
.controller('app.auth.login.ctrl', 
[
    '$state', 
    '$scope', 
    'app.auth.svc', 
    'AUTH_EVENTS', 
    '$timeout',
    'userService',
    '$stateParams',
    '$ionicPopup',

function ($state, $scope, auth, AUTH_EVENTS, $timeout, userService, $stateParams, $ionicPopup) {
    $scope.loginCred = {
        username:'',
        password:''
    };  
    
    $scope.loginMode = true;

    $scope.loginClick = function (credentials) {
        auth.login(credentials)
        .then(function(){
        },
        function(e){
            $ionicPopup.alert({
                title: 'Login Failed',
                template: 'The provided credentials did not authenticate you.'
            });
        });
        
    };

    $scope.$on(AUTH_EVENTS.loginSuccess, function(){

    });

}]);