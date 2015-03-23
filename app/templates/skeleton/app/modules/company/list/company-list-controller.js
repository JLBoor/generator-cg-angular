angular.module('company')

    .controller('companyListController', function($scope, companies) {

        $scope.companies = companies;

    });
