angular.module('usersModule')
    .service('usersRestService', function($resource, restConfigService) {

        var User = $resource(restConfigService.getOperation('/users/:id'), { id: '@id' }, { 'update': { method:'PUT' } });

        return {

            list: function() {
                return User.query().$promise;
            },

            get: function(id) {
                return User.get({id: id}).$promise;
            },

            create: function(user) {
                return User.save(user).$promise;
            },

            update: function(user) {
                return User.update(user).$promise;
            },

            delete: function(user) {
                return User.delete(user).$promise;
            },

            default: function() {
                return User.get({id: 0}).$promise
                    .then(function(user) {
                        delete user.id;
                        return user;
                    });
            }
        };
    });
