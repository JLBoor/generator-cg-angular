angular.module('sampleApp', [
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
        restConfigServiceProvider.setBaseUrl('http://localhost:9002');
        restConfigServiceProvider.setLoginOperation('/login?id=:id');
    });
