angular.module('company')

    .controller('companyDetailsController', function($scope, $state, company, companyRestService) {

        var _backToList = function() { $state.go('^.list'); };

        $scope.company = company;
        $scope.isEditing = company && company.id;

        $scope.delete = function() {
            companyRestService.delete($scope.company)
                .then(_backToList);
        };

        $scope.createOrUpdate = function() {
            companyRestService[$scope.isEditing ? 'update' : 'create']($scope.company)
                .then(_backToList);
        };

    });
