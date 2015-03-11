angular.module('runwayAngular', [
    'ui.bootstrap',
    'ui.router',
    'authConfig',
    'restConfig',
    'stateConfig',
    'companiesModule',
    'usersModule'])



/**
 * Configure rest URL
 */
    .config(function(restConfigServiceProvider) {
        restConfigServiceProvider.setBaseUrl('/data');
        restConfigServiceProvider.setLoginOperation('/data/login');
    });
