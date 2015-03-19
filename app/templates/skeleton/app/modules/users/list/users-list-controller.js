angular.module('users')

    .controller('usersListController', function($scope, users) {

        $scope.users = users;

    });
