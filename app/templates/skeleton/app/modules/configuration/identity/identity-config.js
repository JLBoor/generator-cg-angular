angular.module('configuration.identity', ['configuration.rest', 'ngCookies', 'ui.router'])

    .controller('identityController', function($scope, identityService, authenticationService) {

        $scope.$on('auth.login', function() {
            $scope.identity = identityService.getIdentity();
        });

        $scope.signOut = function () {
            delete $scope.identity;
            authenticationService.clear();
        };
    })

    .service('identityService', function($q, $http, $resource, $cookies, restConfigService) {

        var identity;
        var Identity = $resource(restConfigService.getIdentityOperation(), null, { 'update': { method: 'PUT' } });

        return {

            getIdentity: function () {
                return identity;
            },

            update: function (newIdentity) {
                identity = newIdentity;
            },

            ping: function () {
                if(!$cookies.currentUserId) {
                    return null;
                }

                return Identity.get({id: $cookies.currentUserId}).$promise.then(function(responseIdentity) {

                    if(!responseIdentity || !responseIdentity.id) {
                        delete $cookies.currentUserId;
                        throw 'INVALID SESSION';
                    }

                    identity = responseIdentity;
                    return identity;
                });
            },

            clear: function() {
                return this.update(null);
            }
        };
    });
