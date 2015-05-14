angular.module('configuration.identity', ['configuration.rest', 'ngCookies', 'ui.router'])

    .controller('identityController', function($scope, identityService, authenticationService, $resource, restConfigService) {

        $scope.identity = identityService.getIdentity();

        $scope.$on('auth.login', function() {
            $scope.identity = identityService.getIdentity();
        });

        $scope.signOut = function () {            
            delete $scope.identity;
            authenticationService.signOut();
            identityService.clear();
        };
    })

    .service('identityService', function($q, $http, $resource, $cookies, $log, restConfigService) {

        var identity;
        var Identity = $resource(restConfigService.getIdentityOperation());


        return {

            getIdentity: function () {
                if (identity) {
                    return identity;
                }

                if($cookies.username) {
                    identity = {username: $cookies.username, authorities: $cookies.authorities.split(",")};
                    return identity;
                }
                return null;
            },

            update: function (newIdentity) {
                identity = newIdentity;
                $cookies.username = identity.username;
                $cookies.authorities = identity.authorities.join();
            },

            clear: function() {
                identity = null;
                delete $cookies.username;
                delete $cookies.authorities;
            }
        };
    });
