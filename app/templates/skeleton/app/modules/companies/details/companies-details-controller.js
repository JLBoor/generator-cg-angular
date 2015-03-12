angular.module('companiesModule')

    .controller('companiesDetailsController', function($scope, company, companiesRestService) {

        $scope.company = company;
        $scope.isEditing = company && company.id;

        $scope.delete = function() {
            companiesRestService.delete($scope.company.id);
        };

        $scope.save = function() {
            companiesRestService.save($scope.company);
        };

    });
