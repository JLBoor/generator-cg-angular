angular.module('companiesModule')

    .controller('companiesListController', function($scope, companies) {

        $scope.companies = companies;

    });
