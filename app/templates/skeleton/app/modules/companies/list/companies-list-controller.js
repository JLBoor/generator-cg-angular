angular.module('companies')

    .controller('companiesListController', function($scope, companies) {

        $scope.companies = companies;

    });
