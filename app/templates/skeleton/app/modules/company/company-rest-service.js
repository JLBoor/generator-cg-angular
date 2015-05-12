angular.module('company')
    .service('companyRestService', function($http, restConfigService) {

        var listOperation = restConfigService.getOperation('/companies');

        return {

            list: function () {
                return $http.get(listOperation).then(function (response) {
                    var data = response.data;
                    if(response.data) {
                        return data.elements;
                    }
                    return response;
                });
            },

            get: function (id) {
                return $http.get(listOperation + '/' + id).then(function (response) {
                    return response.data;
                });
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
