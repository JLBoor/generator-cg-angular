angular.module('company', ['configuration.state', 'configuration.rest', 'ngFileUpload'])

/**
 * Configure states
 */
    .config(function($stateProvider) {

        $stateProvider

            .state('page.company', {
                url: '/company',
                template: '<div ui-view></div>',
                abstract: true,
                data: {
                    authorities: ['COMPANY']
                }
            })

            .state('page.company.list', {
                url: '/list',
                templateUrl: 'modules/company/list/company-list.html',
                controller: 'companyListController',
                resolve: {
                    companies: function(companyRestService) {
                        return companyRestService.list();
                    }
                }
            })

            .state('page.company.edit', {
                url: '/:id/edit',
                templateUrl: 'modules/company/details/company-details.html',
                controller: 'companyDetailsController',
                resolve: {
                    company: function($stateParams, companyRestService) {
                        return companyRestService.get($stateParams.id);
                    }
                },
                data: {
                    authorities: ['COMPANY.EDIT']
                }
            })

            .state('page.company.create', {
                url: '/create',
                templateUrl: 'modules/company/details/company-details.html',
                controller: 'companyDetailsController',
                resolve: {
                    company: function(companyRestService) {
                        return companyRestService.default();
                    }
                },
                data: {
                    authorities: ['COMPANY.CREATE']
                }

            });
    });
