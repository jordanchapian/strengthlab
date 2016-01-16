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
    $scope.needsLogout = userService.isActive();
    $scope.activeName = userService.getEmail();
    $scope.loginCred = {
        username:'',
        password:''
    };
    
    $scope.loginClick = function (credentials) {
        auth.login(credentials)
        .then(function(){
            console.log('test');
        },
        function(e){
            ngToast.create({
               className: 'warning',
               content: '<span>Credentials are invalid.</span>'
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
            ngToast.create({
               className: 'warning',
               content: '<span>Trouble Contacting Server. Try again.</span>'
            });
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
        ngToast.create({
           className: 'success',
           content: '<strong>Logout Success</strong><p>Your data has been removed from memory.</p>'
        });
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