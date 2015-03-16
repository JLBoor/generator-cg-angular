angular.module('sampleApp', [
    'ui.bootstrap',
    'ui.router',
    'configuration.authority',
    'configuration.identity',
    'configuration.rest',
    'configuration.state',
    'companiesModule',
    'usersModule'])

/**
 * Configure rest URL
 */
    .config(function(restConfigServiceProvider) {
        restConfigServiceProvider.setBaseUrl('http://localhost:9002');
        restConfigServiceProvider.setAuthenticationOperation('/identities/:id');
        restConfigServiceProvider.setIdentityOperation('/me/:id');
    });
