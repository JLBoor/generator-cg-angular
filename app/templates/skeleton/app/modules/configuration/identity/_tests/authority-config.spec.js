describe('The authority module, ', function () {

    var authenticationService;
    var authorityService;
    var identityService;
    var $rootScope;
    var $state;
    var $q;

    var _isAuthenticated = function(val) {
        authenticationService.isAuthenticated.andReturn($q.when(val));
    };

    var _stateWithAuthorities = function(list) {
        $state.get.andReturn({ data: { authorities: list} });
    };

    beforeEach(module('configuration.identity.authority'));

    beforeEach(inject(function(_authorityService_, _authenticationService_, _identityService_, _$rootScope_, _$state_, _$q_) {
        authorityService = _authorityService_;
        authenticationService = _authenticationService_;
        identityService = _identityService_;
        $rootScope = _$rootScope_;
        $state = _$state_;
        $q = _$q_;

        spyOn($state, 'go');
        spyOn(authenticationService, 'isAuthenticated');
    }));


    describe('should publish authorityService.hasAuthority under $rootScope.$hasAuthority', function () {
        it('should build the authentication operation', function () {
            expect($rootScope.$hasAuthority).toBe(authorityService.hasAuthority);
        });
    });

    describe('has a authorityService.hasAuthority service that', function () {

        beforeEach(function() {
            spyOn($state, 'get');
            spyOn(identityService, 'getIdentity');
        });

        it('should return true when the destination state does not require authority', function () {

            $state.get.andReturn({});
            expect(authorityService.hasAuthority()).toBe(true);

            $state.get.andReturn({ data: {} });
            expect(authorityService.hasAuthority()).toBe(true);
        });

        it('should return false when the state does not exist', function () {
            $state.get.andReturn(null);
            expect(authorityService.hasAuthority()).toBe(false);
        });

        it('should return false when there is no identity', function () {
            _stateWithAuthorities([]);
            identityService.getIdentity.andReturn(null);

            expect(authorityService.hasAuthority()).toBe(false);
        });

        it('should return false when the identity does not have the required authority', function () {
            _stateWithAuthorities(['authorityA', 'authorityB']);
            identityService.getIdentity.andReturn({ authorities: ['authorityC']});

            expect(authorityService.hasAuthority()).toBe(false);
        });

        it('should return true when the identity has the required authority', function () {
            _stateWithAuthorities(['authorityA', 'authorityB']);
            identityService.getIdentity.andReturn({ authorities: ['authorityB']});

            expect(authorityService.hasAuthority()).toBe(false);
        });

    });

    describe('is listening to the $stateChangeStart event, and', function () {

        beforeEach(function() {
            _isAuthenticated(true);
            spyOn(authorityService, 'hasAuthority');
        });

        it('should not do anything when trying to access page.errors.403', function () {

            authorityService.hasAuthority.andReturn(true);
            $rootScope.$broadcast('$stateChangeStart', {name: 'page.errors.403'});
            $rootScope.$apply();

            authorityService.hasAuthority.andReturn(false);
            $rootScope.$broadcast('$stateChangeStart', {name: 'page.errors.403'});
            $rootScope.$apply();

            expect($state.go).not.toHaveBeenCalledWith('page.errors.403');
        });

        it('should not do anything when trying to access a page and has authority', function () {

            authorityService.hasAuthority.andReturn(true);
            $rootScope.$broadcast('$stateChangeStart', {name: 'page.home'});
            $rootScope.$apply();

            expect($state.go).not.toHaveBeenCalledWith('page.errors.403');
        });

        it('should redirect to page.errors.403 when trying to access a page without the authority', function () {

            authorityService.hasAuthority.andReturn(false);
            $rootScope.$broadcast('$stateChangeStart', {name: 'page.home'});
            $rootScope.$apply();

            expect($state.go).toHaveBeenCalledWith('page.errors.403');
        });

    });



});
