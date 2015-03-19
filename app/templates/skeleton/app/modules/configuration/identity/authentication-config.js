angular.module('configuration.identity.authentication', ['configuration.identity', 'configuration.state', 'ngCookies', 'ui.router'])

    .controller('authenticationController', function($scope, $state, authenticationService) {

        $scope.signIn = function(username) {
            authenticationService.authenticate(username)
                .then(function() {
                    $state.go('page.home');
                });
        };
    })

    .service('authenticationService', function($q, $http, $resource, $cookies, $rootScope, restConfigService, identityService) {

        var Authentication = $resource(
            restConfigService.getAuthenticationOperation(), null, { 'update': { method:'PUT' } }
        );

        var _loginEvent = function(identity) { $rootScope.$broadcast('auth.login', identity); };
        var _logoutEvent = function() { $rootScope.$broadcast('auth.logout'); };

        return {

            clear: function() {
                delete $cookies.sessionId;
                return identityService.clear().then(_logoutEvent);
            },

            authenticate: function(username, password) {

                return Authentication.query({username : username, password: password}).$promise

                    .then(function(sessions) {

                        if(!sessions || sessions.length !== 1) { throw 'INVALID CREDENTIALS'; }

                        $cookies.sessionId = 0;

                        return sessions[0];
                    })

                    .then(identityService.update)
                    .then(_loginEvent);
            },

            isAuthenticated: function() {
                return $q.when(identityService.getIdentity() || identityService.ping())
                    .then(function(identity) {
                        if(!identity) { return false; }
                        _loginEvent(identity);
                        return true;
                    }, function() { return false; });
            }
        };
    })

    .config(function($stateProvider) {

        $stateProvider

            .state('page.login', {
                url: '/login',
                controller: 'authenticationController',
                templateUrl: 'modules/configuration/identity/partial/login.html'
            })

            .state('page.logout', {
                url: '/logout',
                resolve: {
                    'logout':  function(authenticationService) {
                        return authenticationService.clear();
                }},
                templateUrl: 'modules/configuration/identity/partial/logout.html'
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
