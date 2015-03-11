angular.module('usersModule')

    .controller('usersListController', function($scope, users) {

        $scope.users = users;

    });
