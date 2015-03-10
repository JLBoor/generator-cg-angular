angular.module('<%= _.camelize(appname) %>', ['ui.bootstrap','ui.router']);

angular.module('<%= _.camelize(appname) %>').config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

});

