angular.module('companies')

    .controller('companiesDetailsController', function($scope, $state, company, companiesRestService) {

        var _backToList = function() { $state.go('^.list'); };

        $scope.company = company;
        $scope.isEditing = company && company.id;

        $scope.delete = function() {
            companiesRestService.delete($scope.company)
                .then(_backToList);
        };

        $scope.createOrUpdate = function() {
            companiesRestService[$scope.isEditing ? 'update' : 'create']($scope.company)
                .then(_backToList);
        };

    });
