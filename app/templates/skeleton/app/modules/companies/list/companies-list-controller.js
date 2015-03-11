angular.module('companiesModule')

    .controller('companiesListController', function($scope, companies) {

        $scope.companies = companies;

        $scope.toggleFavorite = function(company) {
            company.favorite = !company.favorite;
        };

    });
