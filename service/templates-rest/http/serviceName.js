angular.module('<%= appname %>')
    .service('<%= _.camelize(name) %>', function($http, restConfigService) {

        var restOperation = restConfigService.getOperation('<%= restOperation %>');

        var _processResponse = function(response) {
            return response.data;
        };

        return {

            list: function() {
                return $http.get(restOperation).then(_processResponse);
            },

            get: function(id) {
                return $http.get(restOperation + '/' + id).then(_processResponse);
            },

            create: function(<%= _.camelize(entityName) %>) {
                return $http.post(restOperation, <%= _.camelize(entityName) %>);
            },

            update: function(<%= _.camelize(entityName) %>) {
                return $http.put(restOperation + '/' + <%= _.camelize(entityName) %>.id, <%= _.camelize(entityName) %>);
            },

            delete: function(<%= _.camelize(entityName) %>) {
                return $http.delete(restOperation + '/' + <%= _.camelize(entityName) %>.id);
            }
        };
    });
