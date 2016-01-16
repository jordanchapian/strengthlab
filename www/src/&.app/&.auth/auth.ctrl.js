angular.module('strengthlab.app.auth')
.controller('app.auth.ctrl', 
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

    $scope.logout = function () {
        auth.logout()
        .then(function(){//logged out success
            //fresh reload to flush browser state
            $state.go('app.login', {timeout: false, manual:true}, {notify: false});
            window.location.reload(true);
        },
        function(){//some failure
            
        });
        
    };

    $scope.redirectUser = function(){
        if(!userService.isActive())return;
        else if(userService.systemPermission.isUser()) {
            $state.go('app.admin.overview.stations');
        }
        else if(userService.systemPermission.isSuperUser()) {
            $state.go('app.superuser.manage.user');
        }
    };

    $scope.$on(AUTH_EVENTS.loginSuccess, $scope.redirectUser);

    if($stateParams.manual){
        $state.go('app.login', {manual:false}, {notify: false});
        
    }

}]);