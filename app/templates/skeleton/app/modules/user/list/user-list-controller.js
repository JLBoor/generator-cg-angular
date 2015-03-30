angular.module('user')

    .controller('userListController', function($scope, filterableUsers) {

        $scope.filterableUsers = filterableUsers;

    });
