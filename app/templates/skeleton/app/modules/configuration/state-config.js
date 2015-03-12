angular.module('stateConfig', [])

    .provider('STATE', function() {

        this.$get = function() {};

    })

    .config(function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/page/home');

        $stateProvider.state('page', {
            url: '/page',
            abstract: true,
            template: '<div ui-view></div>'
        });

        $stateProvider.state('page.home', {
            url: '/home',
            controller: function($state) {
                $state.transitionTo('page.companies.list');
            }
        });

    });

