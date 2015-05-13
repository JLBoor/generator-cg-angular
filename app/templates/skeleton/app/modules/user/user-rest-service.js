angular.module('user')

    .service('userRestService', function($resource, restConfigService) {

        var User = $resource(restConfigService.getOperation('/users/:id'), { id: '@id' }, { 'update': { method:'PUT' } });
        var newEntityId = restConfigService.getNewEntityId();

        return {

            list: function(PartialPageFilter) {
                return User.get(PartialPageFilter).$promise;
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
                return User.delete({id: user.id}).$promise;
            },

            default: function() {
                return User.get({id: newEntityId}).$promise
                    .then(function(user) {
                        delete user.id;
                        return user;
                    });
            }
        };
    });
