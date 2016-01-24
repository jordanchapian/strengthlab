angular.module('strengthlab.app.auth')
.controller('app.auth.signup.ctrl', 
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
    $scope.signupCred = {
        email:'',
        password:''
    };  

    $scope.signupClick = function (credentials) {
        auth.signup(credentials)
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
            $ionicPopup.alert({
                title: 'Signup Failed',
                template: e
            });
        })
    };

}]);