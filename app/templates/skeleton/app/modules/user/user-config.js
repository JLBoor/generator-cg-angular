angular.module('user', ['configuration.rest', 'configuration.state'])

/**
 * Configure states
 */
    .config(function($stateProvider) {

        $stateProvider

            .state('page.user', {
                url: '/user',
                template: '<div ui-view></div>',
                abstract: true,
                data: {
                    authorities: ['USER']
                }
            })

            .state('page.user.list', {
                url: '/list',
                templateUrl: 'modules/user/list/user-list.html',
                controller: 'userListController',
                resolve: {
                    users: function(userRestService) {
                        return userRestService.list();
                    }
                }
            })

            .state('page.user.edit', {
                url: '/:id/edit',
                templateUrl: 'modules/user/details/user-details.html',
                controller: 'userDetailsController',
                resolve: {
                    user: function($stateParams, userRestService) {
                        return userRestService.get($stateParams.id);
                    }
                },
                data: {
                    authorities: ['USER.EDIT']
                }
            })

            .state('page.user.create', {
                url: '/create',
                templateUrl: 'modules/user/details/user-details.html',
                controller: 'userDetailsController',
                resolve: {
                    user: function(userRestService) {
                        return userRestService.default();
                    }
                },
                data: {
                    authorities: ['USER.CREATE']
                }

            });
    });
