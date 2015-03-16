angular.module('configuration.authority', ['configuration.identity'])

    .config(function($stateProvider) {
        $stateProvider.state('page.errors.403', {
            url: '/403',
            templateUrl: 'modules/configuration/partial/403.html'
        });
    })

    .service('authorityService', function($state, identityService) {

        return {
            hasAuthority: function(stateId) {

                var identity = identityService.getIdentity();
                var state = $state.get(stateId);

                if(!identity || !state) { return false; }
                if(!state.data || !state.data.authorities) { return true; }

                return identity.authorities && _.every(state.data.authorities, function(authority) {
                    return identity.authorities.indexOf(authority) !== -1;
                });
            }
        };

    })

    .run(function($rootScope, authorityService) {

        $rootScope.$hasAuthority = authorityService.hasAuthority;

    });
