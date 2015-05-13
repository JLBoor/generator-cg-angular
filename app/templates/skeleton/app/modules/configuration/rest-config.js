angular.module('configuration.rest', ['ngResource'])
    .provider('restConfigService', function() {

        var newEntityId = "-1";
        var baseUrl = '/';
        var identityOperation;
        var logoutOperation;
        var authenticationOperation;

        var RestConfigService = function() {

            this.getIdentityOperation = function() {
                return baseUrl + identityOperation;
            };

            this.getOperation = function(operation) {
                return baseUrl + operation;
            };

            this.getLogoutOperation = function() {
                return baseUrl + logoutOperation;
            };

            this.getNewEntityId = function() {
                return newEntityId;
            };
        };

        this.setBaseUrl = function(url) { baseUrl = url; };
        this.setIdentityOperation = function(op) { identityOperation = op; };
	this.setLogoutOperation = function(op) { logoutOperation = op; };

        this.$get = [function() {
            return new RestConfigService();
        }];
    });

