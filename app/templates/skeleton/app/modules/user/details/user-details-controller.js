angular.module('user')

    .controller('userDetailsController', function($scope, $state, user, userRestService) {

        var _backToList = function() { $state.go('^.list'); };

        $scope.user = user;
        $scope.isEditing = user && user.id;

        $scope.createOrUpdate = function() {
            userRestService[$scope.isEditing ? 'update' : 'create']($scope.user)
                .then(_backToList);
        };

        $scope.delete = function() {
            userRestService.delete(user)
                .then(_backToList);
        };

    });
