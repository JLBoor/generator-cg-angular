angular.module('companiesModule')

    .controller('companiesDetailsController', function($scope, company, companiesRestService) {

        $scope.company = company;
        $scope.isEditing = company && company._id;

        $scope.delete = function() {
            companiesRestService.delete($scope.company._id);
        };

        $scope.save = function() {
            companiesRestService.save($scope.company);
        };

    });
