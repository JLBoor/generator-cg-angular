describe('The identity module, ', function () {

    var $scope;
    var $rootScope;
    var $controller;
    var $httpBackend;

    var identityService;
    var identityController;
    var identityOperation;

    beforeEach(module('configuration.identity', function(_restConfigServiceProvider_) {
        _restConfigServiceProvider_.setBaseUrl('/base');
        _restConfigServiceProvider_.setIdentityOperation('/identity');

        identityOperation = '/base/identity';
    }));

    beforeEach(inject(function(_identityService_, _$rootScope_, _$controller_, _$httpBackend_) {

        $rootScope = _$rootScope_;
        $controller = _$controller_;
        $httpBackend = _$httpBackend_;

        $scope = $rootScope.$new();

        identityService = _identityService_;

        identityController = $controller('identityController', { $scope: $scope });
    }));


    describe('has identityController that', function () {
        it('should set $scope.identity on auth.login and delete it on auth.logout', function () {

            var identity = 'id';
            spyOn(identityService, 'getIdentity').andReturn(identity);

            $rootScope.$broadcast('auth.login');
            $rootScope.$apply();

            expect($scope.identity).toBe(identity);

            $rootScope.$broadcast('auth.logout');
            $rootScope.$apply();

            expect($scope.identity).toBeUndefined();
        });
    });


    describe('has identityService that', function () {
        it('should set $scope.identity on auth.login and delete it on auth.logout', function () {

            var identity = 'id2';
            identityService.update('id2');

            $httpBackend.expectPUT(identityOperation + '?id=0', { identity: identity }).respond();
            expect(identityService.getIdentity()).toBe(identity);

            $httpBackend.flush();
        });

        it('should set $scope.identity on auth.login and delete it on auth.logout', function () {

            identityService.clear();

            $httpBackend.expectPUT(identityOperation + '?id=0', { identity: null }).respond();
            expect(identityService.getIdentity()).toBe(null);

            $httpBackend.flush();
        });

        it('should set $scope.identity on auth.login and delete it on auth.logout', function () {

            identityService.ping();

            $httpBackend.expectGET(identityOperation + '?id=0').respond( { identity: null } );
            expect($httpBackend.flush).toThrow('INVALID SESSION');
        });

        it('should set $scope.identity on auth.login and delete it on auth.logout', function () {

            var identity = { username: 'john.doe' };
            var pingPromise = identityService.ping();

            $httpBackend.expectGET(identityOperation + '?id=0').respond( { identity: identity } );

            pingPromise.then(function() {
                expect(identityService.getIdentity()).toEqual(identity);
            });

            $httpBackend.flush();
        });

    });

});
