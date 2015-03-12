angular.module('authConfig', [])

    .service('authService', function($q, $http, $resource, restConfigService) {

        var username;
        var isAutenticated;
        var Login = $resource(restConfigService.getLoginOperation());

        return {

            authenticate: function(username) {
                return Login.query({id : username}).$promise.then(function(session) {
                    isAutenticated = !!(session && session.length);
                    if(!isAutenticated) { throw "INVALID CREDENTIALS"; }
                    return isAutenticated;
                });
            },

            isAuthenticated: function() {
                return $q.when(isAutenticated || this.authenticate(username))
                    .then(
                        function(isAuth) { return isAutenticated = isAuth; },
                        function() { return isAutenticated = false; });
            }
        };
    })

    .controller('authController', function($scope, $state, authService) {
        $scope.signIn = function(username) {
            authService.authenticate(username).then(function() {
                $state.go('page.home');
            });
        };
    })

    .config(function($stateProvider) {
        $stateProvider.state('page.login', {
            url: '/login',
            controller: 'authController',
            templateUrl: 'modules/configuration/partial/login.html'
        });

    })

    .run(function($rootScope, $state, authService) {

        $rootScope.$on('$stateChangeStart', function (event, toState) {

            authService.isAuthenticated().then(function(isAuthenticated) {

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
