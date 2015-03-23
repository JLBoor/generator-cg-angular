angular.module('company')
    .service('companyRestService', function($http, restConfigService) {

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

            delete: function(company) {
                return $http.delete(listOperation + '/' + company.id);
            },

            default: function() {
                return {
                    name: 'New Company'
                };
            }
        };
    });
