angular.module('usersModule')

    .controller('usersDetailsController', function($scope, user, usersRestService) {

        $scope.user = user;
        $scope.isEditing = user && user.id;

        $scope.save = function() { usersRestService.save(user); };
        $scope.delete = function() { usersRestService.delete(user); };

    });
