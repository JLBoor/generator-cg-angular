angular.module('user')

    .controller('userListController', function($scope, users) {

        $scope.users = users;

    });
