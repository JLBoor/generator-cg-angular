angular.module('configuration.identity', [])

    .service('identityService', function($q, $http, $resource, restConfigService) {

        var identity;
        var Identity = $resource(restConfigService.getIdentityOperation(), null, { 'update': { method:'PUT' } });

        return {

            update: function (newIdentity) {
                identity = newIdentity;
                return Identity.update({id: 0}, {identity: newIdentity}).$promise;
            },

            getIdentity: function () {
                return identity;
            },

            clear: function() {
               identity = null;
            }
        };
    })

    .service('authenticationService', function($q, $http, $resource, restConfigService, identityService) {

        var isAuthenticated;

        var Authentication = $resource(
            restConfigService.getAuthenticationOperation(), null, { 'update': { method:'PUT' } }
        );

        return {

            authenticate: function(username) {

                isAuthenticated = null;
                identityService.clear();

                return Authentication.query({username : username}).$promise

                    .then(function(sessions) {
                        if(!sessions || sessions.length !== 1) { throw "INVALID CREDENTIALS"; }
                        return sessions[0];
                    })

                    .then(identityService.update)

                    .then(function() {
                        return isAuthenticated = true;
                    });
            },

            isAuthenticated: function() {
                var identity = identityService.getIdentity();
                return $q.when(isAuthenticated || identity && this.authenticate(identity.username))
                    .then(
                        function(isAuth) { return isAuthenticated = isAuth; },
                        function() { return isAuthenticated = false; });
            }
        };
    })

    .controller('authenticationController', function($scope, $state, authenticationService) {
        $scope.signIn = function(username) {
            authenticationService.authenticate(username)
                .then(function() {
                    $state.go('page.home');
                });
        };
    })

    .config(function($stateProvider) {
        $stateProvider
            .state('page.login', {
                url: '/login',
                controller: 'authenticationController',
                templateUrl: 'modules/configuration/partial/login.html'
            });
    })

    .run(function($rootScope, $state, authenticationService) {

        $rootScope.$on('$stateChangeStart', function (event, toState) {

            authenticationService.isAuthenticated().then(function(isAuthenticated) {

                if(toState.name !== 'page.login' && !isAuthenticated) {
                    $state.go('page.login');
                    event.preventDefault();
                }
                else if(toState.name === 'page.login' && isAuthenticated) {
                    $state.go('page.home');
                    event.preventDefault();
                }

            });
        });
    });
