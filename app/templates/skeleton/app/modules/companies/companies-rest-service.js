angular.module('companiesModule')
    .service('companiesRestService', function($http, restConfigService) {

        var listOperation = restConfigService.getOperation('/companies');

        var _processResponse = function(response) {
            return response.data;
        };

        return {

            list: function() {
                return $http.get(listOperation).then(_processResponse);
            },

            get: function(id) {
                return $http.get(listOperation + '/' + id).then(_processResponse);
            },

            create: function(company) {
                return $http.post(listOperation, company);
            },

            update: function(company) {
                return $http.put(listOperation + '/' + company.id, company);
            },

            delete: function(id) {
                return $http.delete(listOperation + '/' + id);
            },

            default: function() {
                return {
                    name: 'New Company'
                };
            }
        };
    });
