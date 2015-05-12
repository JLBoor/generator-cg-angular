angular.module('company')
    .service('companyRestService', ['$http', 'Upload', 'restConfigService' , function($http, Upload, restConfigService) {

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

            createOrUpdate: function (company, imageFile, isEditing) {
                return Upload.upload({
                    url: isEditing ? (listOperation + '/' + company.id) : listOperation,
                    method: isEditing ? 'PUT' : 'POST',
                    file: imageFile,
                    data: company
                });
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
    }]);
