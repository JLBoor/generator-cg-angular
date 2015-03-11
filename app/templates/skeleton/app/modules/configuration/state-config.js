angular.module('stateConfig', [])

    .config(function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider.state('page', {
            url: '/page',
            template: '<div ui-view></div>'
        });

    });

