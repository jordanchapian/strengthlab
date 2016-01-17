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
        username:'',
        password:''
    };  

    $scope.signupClick = function (credentials) {
        auth.signup(credentials)
        .then(function(){
        },
        function(e){
            $ionicPopup.alert({
                title: 'Signup Failed',
                template: 'We were unable to create a user with the provided credentials.'
            });
        });
        
    };

    $scope.$on(AUTH_EVENTS.signupSuccess, function(){
        console.log('woo hoo');
    });

}]);