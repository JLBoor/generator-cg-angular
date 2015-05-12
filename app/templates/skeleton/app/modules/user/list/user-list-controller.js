angular.module('user')

    .controller('userListController', function($scope, filterableUsers) {

        $scope.filterableUsers = filterableUsers;
        $scope.filterParams = {};
        filterableUsers.filterParams = $scope.filterParams;        

        $scope.orderBy = function(property) {
            $scope.filterableUsers.applyOrderByProperty(property);
            filterableUsers.filter($scope.filterParams._pageNumber);
        };

        $scope.orderedClass = function(property) {
            if ($scope.filterableUsers.isOrderedBy(property)) {
                if ($scope.filterableUsers.isAscending) {
                    return "glyphicon glyphicon-chevron-up";
                } else {
                    return "glyphicon glyphicon-chevron-down";
                }
            }

            return null;
        };
    });
