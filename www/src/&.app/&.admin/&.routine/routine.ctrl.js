angular.module('strengthlab.app.admin.routine')
.controller('app.admin.routine.ctrl', 
[
    '$state', 
    '$scope', 
    '$ionicPopup',
    '$ionicModal',
    'dataservice.routineCollection.svc',
function ($state, $scope, $ionicPopup, $ionicModal,routineCollection) {
    
    $ionicModal.fromTemplateUrl('./&.app/&.admin/&.routine/newRoutine.tpl.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.newRoutineModal = modal;
    });

    $scope.showNewRoutineModal = function(){
        //create new object for input
        $scope.newRoutineInput = {};
        $scope.newRoutineModal.show();
    };

    $scope.saveNewRoutine = function(){
        console.log($scope.newRoutineInput);
        //validate
        if(!$scope.newRoutineInput.title){
            $ionicPopup.alert({
                title: 'Invalid Input',
                template: 'You must at least enter a title for the routine'
            });
        }
        else{
            $scope.newRoutineModal.hide();
        }
    };

    $scope.closeNewRoutineModal = function(){
        $scope.newRoutineModal.hide();
    };

    $scope.$on('$destroy', function() {
        $scope.newRoutineModal.remove();
    });

}]);