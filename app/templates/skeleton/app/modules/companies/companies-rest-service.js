angular.module('companiesModule')
    .service('companiesRestService', function($http, restConfigService) {

        var listOperation = restConfigService.getOperation('/companies/list.json');
        var listDetails = restConfigService.getOperation('/companies/details.json');

        var _processResponse = function(response) {
            return response.data;
        };

        return {

            list: function() {
                return $http.get(listOperation).then(_processResponse);
            },

            get: function(id) {
                // FIXME use id
                return $http.get(listDetails).then(_processResponse);
            },

            save: function(company) {
                return $http[company._id ? 'put' : 'post'](listDetails, company);
            },

            delete: function(id) {
                // FIXME use id
                return $http.delete(listDetails);
            },

            default: function() {
                // FIXME $http
                return {
                    name: 'New Company'
                };
            }
        };
    });
