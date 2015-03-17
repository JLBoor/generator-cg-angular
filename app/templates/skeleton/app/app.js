angular.module('sampleApp', [
    'ui.bootstrap',
    'ui.router',
    'configuration.authority',
    'configuration.identity',
    'configuration.rest',
    'configuration.state',
    'configuration.translate',
    'companiesModule',
    'usersModule'])

/**
 * Configure rest URL
 */
    .config(function(restConfigServiceProvider){
        restConfigServiceProvider.setBaseUrl('http://localhost:9002');
        restConfigServiceProvider.setAuthenticationOperation('/identities/:id');
        restConfigServiceProvider.setIdentityOperation('/me/:id');
    })

/**
 * Configure states
 */
    .config(function(stateConfigServiceProvider) {

        var findHomeState = ['authorityService', function(authorityService) {

            if(authorityService.hasAuthority('page.companies.list')) { return 'page.companies.list'; }
            else if(authorityService.hasAuthority('page.users.list')) { return 'page.users.list'; }

            return 'page.errors.403';
        }];

        stateConfigServiceProvider.setHomeState(findHomeState);
    });


