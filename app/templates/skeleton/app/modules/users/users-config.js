angular.module('usersModule', [])

/**
 * Configure states
 */
    .config(function($stateProvider) {

        $stateProvider

            .state('page.users', {
                url: '/users',
                template: '<div ui-view></div>',
                abstract: true
            })

            .state('page.users.list', {
                url: '/list',
                templateUrl: 'modules/users/list/users-list.html',
                controller: 'usersListController',
                resolve: {
                    users: function(usersRestService) {
                        return usersRestService.list().$promise;
                    }
                }
            })

            .state('page.users.edit', {
                url: '/:id/edit',
                templateUrl: 'modules/users/details/users-details.html',
                controller: 'usersDetailsController',
                resolve: {
                    user: function($stateParams, usersRestService) {
                        return usersRestService.get($stateParams.id).$promise;
                    }
                }
            })

            .state('page.users.create', {
                url: '/create',
                templateUrl: 'modules/users/details/users-details.html',
                controller: 'usersDetailsController',
                resolve: {
                    user: function(usersRestService) {
                        return usersRestService.default().$promise;
                    }
                }

            });
    });
