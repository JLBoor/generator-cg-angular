angular.module('companies', ['configuration.state', 'configuration.rest'])

/**
 * Configure states
 */
    .config(function($stateProvider) {

        $stateProvider

            .state('page.companies', {
                url: '/companies',
                template: '<div ui-view></div>',
                abstract: true,
                data: {
                    authorities: ['COMPANIES']
                }
            })

            .state('page.companies.list', {
                url: '/list',
                templateUrl: 'modules/companies/list/companies-list.html',
                controller: 'companiesListController',
                resolve: {
                    companies: function(companiesRestService) {
                        return companiesRestService.list();
                    }
                }
            })

            .state('page.companies.edit', {
                url: '/:id/edit',
                templateUrl: 'modules/companies/details/companies-details.html',
                controller: 'companiesDetailsController',
                resolve: {
                    company: function($stateParams, companiesRestService) {
                        return companiesRestService.get($stateParams.id);
                    }
                },
                data: {
                    authorities: ['COMPANIES.EDIT']
                }
            })

            .state('page.companies.create', {
                url: '/create',
                templateUrl: 'modules/companies/details/companies-details.html',
                controller: 'companiesDetailsController',
                resolve: {
                    company: function(companiesRestService) {
                        return companiesRestService.default();
                    }
                },
                data: {
                    authorities: ['COMPANIES.CREATE']
                }

            });
    });
