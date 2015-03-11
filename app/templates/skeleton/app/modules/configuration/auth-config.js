angular.module('authConfig', [])

    .config(function($stateProvider) {

        $stateProvider.state('page.login', {
            url: '/login',
            templateUrl: 'modules/configuration/partial/login.html'
        });

    });
