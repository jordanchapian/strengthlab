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
        email:'',
        password:''
    };  
    
    $scope.loginMode = true;

    $scope.loginClick = function (credentials) {

        auth.login(credentials)
        .then(function(){
            userService.init()
            .then(function(){
                $state.go('app.admin.landing');
            },
            function(){
                $ionicPopup.alert({
                    title: 'Uh Oh',
                    template: 'We are having problems. Please try again later.'
                });
            });
        },
        function(e){
            console.log(e);
            $ionicPopup.alert({
                title: 'Login Failed',
                template: e
            });
        });
        
    };

}]);