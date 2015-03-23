angular.module('<%= appname %>')
    .service('<%= _.camelize(name) %>',function() {

        return {

            myOperation: function() {

            }
        };
});
