describe('The authentication module, ', function () {

    var authenticationService;
    var authOperation;
    var identityService;

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
        _restConfigServiceProvider_.setAuthenticationOperation('/auth');

        authOperation = '/base/auth';
    }));

    beforeEach(inject(function(_authenticationService_, _identityService_, _$httpBackend_, _$rootScope_, _$controller_, _$state_, _$q_, _$cookies_) {
        authenticationService = _authenticationService_;
        identityService = _identityService_;

        $httpBackend = _$httpBackend_;
        $controller = _$controller_;
        $rootScope = _$rootScope_;
        $cookies = _$cookies_;
        $state = _$state_;
        $q = _$q_;

        spyOn($state, 'go');

        spyOn(identityService, 'update');
    }));


    describe('has an authenticationController with a $scope.signIn function that', function () {

        var authenticationController;
        var username = 'john';
        var $scope;

        beforeEach(function() {
            $scope = $rootScope.$new();
            authenticationController = $controller('authenticationController', { $scope: $scope });

            spyOn(authenticationService, 'authenticate');
            spyOn(authenticationService, 'isAuthenticated').andReturn($q.when(true));
        });


        it('should take the user to the page.home state when the authentication is successful', function () {
            _authenticate(true);

            $scope.signIn(username);
            $rootScope.$apply();

            expect(authenticationService.authenticate).toHaveBeenCalledWith(username);
            expect($state.go).toHaveBeenCalledWith('page.home');
        });

        it('should not change state when the authentication failed', function () {
            _authenticate(false);

            $scope.signIn(username);
            $rootScope.$apply();

            expect(authenticationService.authenticate).toHaveBeenCalledWith(username);
            expect($state.go).not.toHaveBeenCalled();
        });
    });

    describe('has a authenticationService that', function () {

        var user = {id: 9, username: 'u', password: 'pwd'};

        beforeEach(function() {
            spyOn($rootScope, '$broadcast').andCallThrough();

            spyOn(identityService, 'ping');
            spyOn(identityService, 'getIdentity');
            spyOn(identityService, 'clear').andReturn($q.when(true));
        });

        it('should clear the sessionId and broadcast the auth.logout event when clear is called', function () {

            $cookies.sessionId = 'abc';
            expect($cookies.sessionId).not.toBeUndefined();

            authenticationService.clear();
            $rootScope.$apply();

            expect($cookies.sessionId).toBeUndefined();
            expect($rootScope.$broadcast).toHaveBeenCalledWith('auth.logout');
        });


        describe('has an authenticate service that', function () {

            it('should not do anything when the authentication fails', function () {

                $httpBackend.whenGET(authOperation + '?password=' + user.password + '&username=' + user.username).respond(404);

                authenticationService.authenticate(user.username, user.password);
                $httpBackend.flush();

                expect(identityService.update).not.toHaveBeenCalled();
                expect($rootScope.$broadcast).not.toHaveBeenCalledWith('auth.login');
                expect($cookies.sessionId).toBeUndefined();
            });

            it('should update the identity, broadcast auth.login and store the sessionId when the authentication works', function () {

                identityService.update.andReturn(user);
                $httpBackend.whenGET(authOperation + '?password=' + user.password + '&username=' + user.username).respond(200, [user]);

                authenticationService.authenticate(user.username, user.password);
                $httpBackend.flush();

                expect(identityService.update).toHaveBeenCalledWith(jasmine.objectContaining(user));
                expect($rootScope.$broadcast).toHaveBeenCalledWith('auth.login', user);
                expect($cookies.sessionId).toBe('0'); // Testing string because it comes from the $cookie service
            });
        });

        describe('has an isAuthenticated service that', function () {

            it('should return true when there is an identity and broadcast auth.login', function () {

                identityService.getIdentity.andReturn(user);

                authenticationService.isAuthenticated().then(function (isAuthenticated) {
                    expect(isAuthenticated).toBe(true);
                    expect($rootScope.$broadcast).toHaveBeenCalledWith('auth.login', user);
                });

                $rootScope.$apply();
            });

            it('should return true and broadcast auth.login when there is no identity but the ping is still valid ', function () {

                identityService.getIdentity.andReturn(false);
                identityService.ping.andReturn(user);

                $rootScope.$apply();

                authenticationService.isAuthenticated().then(function (isAuthenticated) {
                    expect(isAuthenticated).toBe(true);
                    expect($rootScope.$broadcast).toHaveBeenCalledWith('auth.login', user);
                });
            });

            it('should return false when there is no identity nor ping valid', function () {

                identityService.getIdentity.andReturn(false);
                identityService.ping.andReturn($q.reject('No Ping'));

                $rootScope.$apply();

                authenticationService.isAuthenticated().then(function (isAuthenticated) {
                    expect(isAuthenticated).toBe(false);
                    expect($rootScope.$broadcast).not.toHaveBeenCalled();
                });
            });
        });

    });

    describe('is listening to the $stateChangeStart event, and', function () {

        beforeEach(function() {
            spyOn(authenticationService, 'clear');
        });


        it('should clear the session when transitioning to page.logout', function () {
            $state.transitionTo('page.logout');

            expect(authenticationService.clear).toHaveBeenCalled();
        });

    });

});
