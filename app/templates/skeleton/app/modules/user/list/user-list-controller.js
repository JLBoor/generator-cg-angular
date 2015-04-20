angular.module('user')

    .controller('userListController', function($scope, filterableUsers) {

        $scope.filterableUsers = filterableUsers;
        $scope.filterParamns = {};
        filterableUsers.filterParamns = $scope.filterParamns;

    });
