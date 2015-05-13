angular.module('company')

    .controller('companyDetailsController', function($scope, $state, company, companyRestService) {

        var _backToList = function() { $state.go('^.list'); };

        $scope.company = company;
        $scope.isEditing = company && company.id;
        $scope.image = $scope.$rejectedFiles ? null : $scope.image;
        $scope.imageSizeLimit = 1024*1024*10;

        $scope.delete = function() {
            companyRestService.delete($scope.company)
                .then(_backToList);
        };

        $scope.createOrUpdate = function() {
            companyRestService.createOrUpdate($scope.company, $scope.image, $scope.isEditing)
                .then(_backToList);
        };

    });
