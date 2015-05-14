describe('The identity module, ', function () {

    var $scope;
    var $rootScope;
    var $controller;
    var $httpBackend;
    var $cookies;

    var identityService;
    var authenticationService;
    var identityController;
    var identityOperation;

    beforeEach(module('sampleApp', function(_restConfigServiceProvider_, $translateProvider) {
        _restConfigServiceProvider_.setBaseUrl('/base');
        _restConfigServiceProvider_.setIdentityOperation('/identity');

        identityOperation = '/base/identity';

        // Override translate configuration - http://angular-translate.github.io/docs/#/guide/22_unit-testing-with-angular-translate
        $translateProvider.translations('en', {});
    }));

    beforeEach(inject(function(_identityService_, _authenticationService_, _$rootScope_, _$controller_, _$httpBackend_, _$cookies_, _restConfigService_) {

        $rootScope = _$rootScope_;
        $controller = _$controller_;
        $httpBackend = _$httpBackend_;
        $cookies = _$cookies_;

        $scope = $rootScope.$new();

        identityService = _identityService_;
        authenticationService = _authenticationService_;

        identityController = $controller('identityController', { $scope: $scope });
    }));


    describe('has identityController that', function () {
        it('should set $scope.identity on auth.login and delete it on scope.logout', function () {

            var identity = 'id';
            spyOn(identityService, 'getIdentity').andReturn(identity);
            spyOn(authenticationService, 'signOut');

            $rootScope.$broadcast('auth.login');
            $rootScope.$apply();

            expect($scope.identity).toBe(identity);

            $scope.signOut();
            $rootScope.$apply();

            expect(authenticationService.signOut).toHaveBeenCalled();
            expect($scope.identity).toBeUndefined();

        });
    });


    describe('has identityService that', function () {
        it('should set the identity', function () {

            var identity = {username: "user", authorities: ["company", "user"]};
            identityService.update(identity);

            expect(identityService.getIdentity()).toBe(identity);
        });

        it('should set the identity and username cookie with update() and clear it with clear()', function () {
            var identity = {username: "user", authorities: ["company", "user"]};

            identityService.update(identity);
            expect(identityService.getIdentity()).toBe(identity);

            expect($cookies.username).toBe("user");

            identityService.clear();
            expect(identityService.getIdentity()).toBe(null);
            expect($cookies.username).toBeFalsy();
        });
    });

});
