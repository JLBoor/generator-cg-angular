angular.module('configuration.rest', ['ngResource'])

    .provider('restConfigService', function() {

        var baseUrl = '/';
        var identityOperation;
        var authenticationOperation;

        var RestConfigService = function() {

            this.getIdentityOperation = function() {
                return baseUrl + identityOperation;
            };

            this.getOperation = function(operation) {
                return baseUrl + operation;
            };
        };

        this.setBaseUrl = function(url) { baseUrl = url; };
        this.setIdentityOperation = function(op) { identityOperation = op; };

        this.$get = [function() {
            return new RestConfigService();
        }];

    });

