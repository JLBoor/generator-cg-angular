describe('The state module, ', function () {

    var $state;
    var $injector;
    var $rootScope;
    var stateConfigService;
    var stateConfigServiceProvider;

    beforeEach(module('configuration.state', function(_stateConfigServiceProvider_) {
        stateConfigServiceProvider = _stateConfigServiceProvider_;
    }));

    beforeEach(inject(function(_stateConfigService_, _$state_, _$rootScope_, _$injector_) {
        stateConfigService = _stateConfigService_;
        $state = _$state_;
        $injector = _$injector_;
        $rootScope = _$rootScope_;
    }));


    describe('has a stateConfiguration.getHomeState service that', function () {

        it('should return undefined when the home state has not been set', function () {
            expect(stateConfigService.getHomeState()).toBeUndefined();
        });

        it('should return the string value', function () {
            stateConfigServiceProvider.setHomeState('homeStateString');

            expect(stateConfigService.getHomeState()).toBe('homeStateString');
        });

        it('should execute the simple function and return the value', function () {
            var simpleFunction = function () {
                return 'homeStateFunction';
            };
            stateConfigServiceProvider.setHomeState(simpleFunction);

            expect(stateConfigService.getHomeState()).toBe('homeStateFunction');
        });

        it('should resolve the dependencies, execute the function and return the result', function () {
            var functionWithInjection = ['$state', function ($state) {
                return $state.current.url;
            }];
            stateConfigServiceProvider.setHomeState(functionWithInjection);

            expect(stateConfigService.getHomeState()).toBe('^');
        });
    });



    describe('defines a page.home that', function () {

        beforeEach(function() {
           spyOn($state, 'transitionTo').andCallThrough();
        });

        it('should not do anything when the home state has not been configured', function () {
            $state.go('page.home');
            $rootScope.$apply();

            expect($state.current.name).toBe('page.home');
        });

        it('should take you to the home state', function () {

            stateConfigServiceProvider.setHomeState('page.errors');

            // Verify that we are first going to the page.home state
            $state.go('page.home');
            $rootScope.$apply();
            expect($state.current.name).toBe('page.home');

            // Execute the controller code,
            // and verify that we transition to the custom home state (page.errors)
            $state.transitionTo.reset();
            $injector.invoke($state.current.controller);
            $rootScope.$apply();

            expect($state.transitionTo).toHaveBeenCalledWith('page.errors');
            expect($state.transitionTo.callCount).toBe(1);
            expect($state.current.name).toBe('page.errors');
        });

    });

});
