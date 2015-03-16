angular.module('configuration.identity', ['ngCookies'])

    .controller('identityController', function($scope, identityService) {

        $scope.$on('authentication.login', function() {
            $scope.identity = identityService.getIdentity();
        });

        $scope.$on('authentication.logout', function() {
            delete $scope.identity;
        });

    })

    .service('identityService', function($q, $http, $resource, restConfigService) {

        var identity;
        var Identity = $resource(restConfigService.getIdentityOperation(), null, { 'update': { method:'PUT' } });

        return {

            getIdentity: function () {
                return identity;
            },

            update: function (newIdentity) {
                identity = newIdentity;
                return Identity.update({id: 0}, {identity: newIdentity}).$promise;
            },

            ping: function () {
                return Identity.get({id: 0}).$promise.then(function(session) {
                    if(!session.identity || !session.identity.id) { throw "INVALID SESSION"; }
                    return identity = session.identity;
                });
            },

            clear: function() {
                return this.update(null);
            }
        };
    })

    .service('authenticationService', function($q, $http, $resource, $cookies, $rootScope, restConfigService, identityService) {

        var Authentication = $resource(
            restConfigService.getAuthenticationOperation(), null, { 'update': { method:'PUT' } }
        );

        var _loginEvent = function() { $rootScope.$broadcast('authentication.login'); };
        var _logoutEvent = function() { $rootScope.$broadcast('authentication.logout'); };

        return {

            clear: function() {
                delete $cookies.sessionId;
                return identityService.clear().then(_logoutEvent);
            },

            authenticate: function(username) {

                return Authentication.query({username : username}).$promise

                    .then(function(sessions) {
                        if(!sessions || sessions.length !== 1) { throw "INVALID CREDENTIALS"; }

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
                        _loginEvent();
                        return true;
                    }, function() { return false; });
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
            })

            .state('page.logout', {
                url: '/logout',
                resolve: {
                    'logout':  function(authenticationService) {
                        return authenticationService.clear();
                }},
                templateUrl: 'modules/configuration/partial/logout.html'
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
