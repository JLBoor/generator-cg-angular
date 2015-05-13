describe('The authentication module, ', function () {

    var authenticationService;
    var identityOperation;
    var identityService;
    var logoutOperation;

    var restConfigService;

    var $httpBackend;
    var $controller;
    var $rootScope;
    var $cookies;
    var $state;
    var $q;

    var _authenticate = function(success) {
        if(success) {
            authenticationService.authenticate.andReturn($q.when(true));
        } else {
            authenticationService.authenticate.andReturn($q.reject('Bad credentials'));
        }
    };

    beforeEach(module('configuration.identity.authentication', function(_restConfigServiceProvider_) {
        _restConfigServiceProvider_.setBaseUrl('/base');
        _restConfigServiceProvider_.setIdentityOperation('/me');
        _restConfigServiceProvider_.setLogoutOperation('/signOut');

        identityOperation = '/base/me';
        logoutOperation = '/base/signOut';
    }));

    beforeEach(inject(function(_authenticationService_, _identityService_, _$httpBackend_, _$rootScope_, _$controller_, _$state_, _$q_, _$cookies_, _restConfigService_) {
        authenticationService = _authenticationService_;
        identityService = _identityService_;
        restConfigService = _restConfigService_;

        $httpBackend = _$httpBackend_;
        $controller = _$controller_;
        $rootScope = _$rootScope_;
        $cookies = _$cookies_;
        $state = _$state_;
        $q = _$q_;

        spyOn($state, 'go');

        spyOn(identityService, 'update');
    }));


    describe('has an authenticationController with a $scope.signIn and a $scope.signOut function that', function () {

        var authenticationController;
        var password = 'pwd';
        var username = 'john';
        var $scope;

        beforeEach(function() {
            $scope = $rootScope.$new();
            authenticationController = $controller('authenticationController', { $scope: $scope });

            spyOn(authenticationService, 'authenticate');
            spyOn(authenticationService, 'isAuthenticated').andReturn($q.when(true));
            spyOn(authenticationService, 'signOut');
        });


        it('should take the user to the page.home state when the authentication is successful', function () {
            _authenticate(true);

            $scope.signIn(username, password);
            $rootScope.$apply();

            expect(authenticationService.authenticate).toHaveBeenCalledWith(username, password);
            expect($state.go).toHaveBeenCalledWith('page.home');
        });

        it('should not change state when the authentication failed', function () {
            _authenticate(false);

            $scope.signIn(username, password);
            $rootScope.$apply();

            expect(authenticationService.authenticate).toHaveBeenCalledWith(username, password);
            expect($state.go).not.toHaveBeenCalled();
        });
    });

    describe('has a authenticationService that', function () {

        var user = {id: 9, username: 'u', password: 'pwd'};

        beforeEach(function() {
            spyOn($rootScope, '$broadcast').andCallThrough();

            spyOn(identityService, 'getIdentity');
            spyOn(identityService, 'clear').andReturn($q.when(true));
        });

        it('should broadcast the auth.logout event when signOut is called', function () {
            $httpBackend.expectDELETE(logoutOperation).respond(200);

            authenticationService.signOut();
            $rootScope.$apply();

            expect($cookies.currentUserId).toBeUndefined();
            expect($rootScope.$broadcast).toHaveBeenCalledWith('auth.logout');
        });


        describe('has an authenticate service that', function () {

            it('should not do anything when the authentication fails', function () {

                $httpBackend.whenGET(identityOperation).respond(404);

                authenticationService.authenticate(user.username, user.password);
                $httpBackend.flush();

                expect(identityService.update).not.toHaveBeenCalled();
                expect($rootScope.$broadcast).not.toHaveBeenCalledWith('auth.login');
            });

            it('should call the identity operation for authentication', function () {

                identityService.update.andReturn(user);
                $httpBackend.expectGET(identityOperation).respond(user);

                authenticationService.authenticate(user.username, user.password);
                $httpBackend.flush();
            });
        });

        describe('has an isAuthenticated service that', function () {

            it('should return true when there is an identity', function () {

                identityService.getIdentity.andReturn(user);

                expect(authenticationService.isAuthenticated()).toBeTruthy();
            });

            it('should return false when there is no identity', function () {

                identityService.getIdentity.andReturn(null);

                $rootScope.$apply();

                expect(authenticationService.isAuthenticated()).toBeFalsy();
            });
        });

    });
});
