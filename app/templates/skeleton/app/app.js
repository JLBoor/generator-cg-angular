angular.module('sampleApp', [
    'ui.bootstrap',
    'ui.router',
    'ngCookies',
    'components',
    'configuration.rest',
    'configuration.state',
    'configuration.locale',
    'configuration.identity',
    'configuration.identity.authority',
    'configuration.identity.authentication',
    'company',
    'user',
    'ngFileUpload'])

/**
 * Configure rest URL
 */
    .config(function(restConfigServiceProvider){
        restConfigServiceProvider.setBaseUrl('http://localhost:9001/rest');
        restConfigServiceProvider.setIdentityOperation('/me');
    })

/**
 * Configure states
 */
    .config(function(stateConfigServiceProvider) {

        var findHomeState = ['authorityService', function(authorityService) {

            if(authorityService.hasAuthority('page.company.list')) { return 'page.company.list'; }
            else if(authorityService.hasAuthority('page.user.list')) { return 'page.user.list'; }

            return 'page.errors.403';
        }];

        stateConfigServiceProvider.setHomeState(findHomeState);
    })

/**
 * Configure filters and pagination
 */
    .config(function(filterableConstants) {
        filterableConstants.pageSize = 3;
    });


