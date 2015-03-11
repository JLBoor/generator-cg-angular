angular.module('restConfig', ['ngResource'])

    .provider('restConfigService', function() {

        var baseUrl = '/';
        var loginOperation = '/login';

        var RestConfigService = function() {

            this.getLoginOperation = function(operation) {
                return baseUrl + loginOperation;
            };

            this.getOperation = function(operation) {
                return baseUrl + operation;
            };
        };

        this.setBaseUrl = function(url) { baseUrl = url; };
        this.setLoginOperation = function(op) { loginOperation = op; };

        this.$get = [function() {
            return new RestConfigService();
        }];

    });

