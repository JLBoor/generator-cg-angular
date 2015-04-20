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

    beforeEach(inject(function(_identityService_, _authenticationService_, _$rootScope_, _$controller_, _$httpBackend_, _$cookies_) {

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
            spyOn(authenticationService, 'clear');

            $rootScope.$broadcast('auth.login');
            $rootScope.$apply();

            expect($scope.identity).toBe(identity);

            $scope.signOut();
            $rootScope.$apply();

            expect(authenticationService.clear).toHaveBeenCalled();
            expect($scope.identity).toBeUndefined();
        });
    });


    describe('has identityService that', function () {
        it('should set $scope.identity on auth.login and delete it on auth.logout', function () {

            var identity = 'id2';
            identityService.update('id2');

            expect(identityService.getIdentity()).toBe(identity);
        });

        it('should set $scope.identity on auth.login and delete it on auth.logout', function () {

            identityService.update('id2');
            expect(identityService.getIdentity()).toBeTruthy();
            identityService.clear();

            expect(identityService.getIdentity()).toBe(null);
        });

        it('should set $scope.identity on auth.login and delete it on auth.logout', function () {

            $cookies.currentUserId = 14;
            $httpBackend.whenGET(identityOperation + '?id=14').respond( { id: null } );
            identityService.ping();

            expect($httpBackend.flush).toThrow('INVALID SESSION');
        });

        it('should set $scope.identity on auth.login and delete it on auth.logout', function () {

            var id = 15;
            var username = 'john.doe';

            $cookies.currentUserId = id;
            var pingPromise = identityService.ping();

            $httpBackend.whenGET(identityOperation + '?id=' + id).respond( { id: id, username: username} );

            pingPromise.then(function() {
                var identity = identityService.getIdentity();
                expect(identity.id).toEqual(id);
                expect(identity.username).toEqual(username);
            });

            $httpBackend.flush();
        });

    });

});
