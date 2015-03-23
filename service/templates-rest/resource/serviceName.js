angular.module('<%= appname %>')
    .service('<%= _.camelize(name) %>', function($resource, restConfigService) {

        var <%= _.classify(entityName) %> = $resource(restConfigService.getOperation('<%= restOperation %>/:id'), { id: '@id' }, { 'update': { method:'PUT' } });

        return {

            list: function() {
                return <%= _.classify(entityName) %>.query().$promise;
            },

            get: function(id) {
                return <%= _.classify(entityName) %>.get({id: id}).$promise;
            },

            create: function(<%= _.camelize(entityName) %>) {
                return <%= _.classify(entityName) %>.save(<%= _.camelize(entityName) %>).$promise;
            },

            update: function(<%= _.camelize(entityName) %>) {
                return <%= _.classify(entityName) %>.update(<%= _.camelize(entityName) %>).$promise;
            },

            delete: function(<%= _.camelize(entityName) %>) {
                return <%= _.classify(entityName) %>.delete({id: <%= _.camelize(entityName) %>.id}).$promise;
            }
        };
    });
