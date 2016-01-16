angular.module('strengthlab.app.login')
.controller('login.ctrl', 
[
    '$state', 
    '$scope', 
    'strengthlab.app.login.auth.svc', 
    'AUTH_EVENTS', 
    '$timeout',
    'userService',
    '$stateParams',

function ($state, $scope, auth, AUTH_EVENTS, $timeout, userService, $stateParams) {
    $scope.loginCred = {
        username:'',
        password:''
    };  
    $scope.loginMode = true;

    $scope.loginClick = function (credentials) {
        auth.login(credentials)
        .then(function(){
            console.log('test');
        },
        function(e){
           
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
    
    //should we inform the user that they have been logged out due to timeout?
    // if($stateParams.timeout){
    //     //we notified user... no need to notify again on refresh
    //     $state.go('app.login', {timeout:false}, {notify: false});
    //     $uibModal.open({
    //         templateUrl: './www/src/usr/app/&.login/timeoutModal.tpl.html',
    //         size: 'md',
    //     });
    // }
}]);