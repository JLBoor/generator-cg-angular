angular.module('usersModule')
    .service('usersRestService', function($resource, restConfigService) {

        var User = $resource('http://jsonplaceholder.typicode.com/users/:id');

        return {

            list: function() {
                return User.query();
            },

            get: function(id) {
                return User.get({id: id});
            },

            save: function(user) {
                return user.$save();
            },

            delete: function(user) {
                return user.$delete({id: user.id});
            },

            default: function() {
                return User.get({id: 1}); // FIXME use your default user id
            }
        };
    });
