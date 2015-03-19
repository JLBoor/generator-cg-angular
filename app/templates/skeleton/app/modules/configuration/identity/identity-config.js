angular.module('configuration.identity', ['configuration.rest', 'ngCookies', 'ui.router'])

    .controller('identityController', function($scope, identityService) {

        $scope.$on('auth.login', function() {
            $scope.identity = identityService.getIdentity();
        });

        $scope.$on('auth.logout', function() {
            delete $scope.identity;
        });
    })

    .service('identityService', function($q, $http, $resource, restConfigService) {

        var identity;
        var Identity = $resource(restConfigService.getIdentityOperation(), null, { 'update': { method: 'PUT' } });

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

                    if(!session.identity || !session.identity.username) { throw 'INVALID SESSION'; }

                    identity = session.identity;
                    return identity;
                });
            },

            clear: function() {
                return this.update(null);
            }
        };
    });
