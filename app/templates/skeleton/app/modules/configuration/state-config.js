angular.module('configuration.state', [])

    .provider('stateConfigService', function() {

        var homeState;

        var StateConfigService = function($injector) {
            this.getHomeState = function() {

                if(angular.isFunction(homeState)) { return homeState(); }
                else if(angular.isString(homeState)) { return homeState; }
                else if(angular.isArray(homeState)) { return $injector.invoke(homeState); }

                return undefined;
            };
        };

        this.setHomeState = function(hs) { homeState = hs; };

        this.$get = ['$injector', function($injector) {
            return new StateConfigService($injector);
        }];

    })

    .config(function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/page/home');

        $stateProvider

            .state('page', {
                url: '/page',
                abstract: true,
                template: '<div ui-view></div>'
            })

            .state('page.errors', {
                url: '/errors',
                abstract: true,
                template: '<div ui-view></div>'
            })

            .state('page.home', {
                url: '/home',
                controller: function($state, stateConfigService) {
                    var homeState = stateConfigService.getHomeState();
                    if(homeState) {
                        $state.transitionTo(homeState);
                    }
                }
            });

    });

