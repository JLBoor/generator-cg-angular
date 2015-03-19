describe('The locale module, ', function () {

    var $translateProvider;
    var $translate;
    var $rootScope;
    var $httpBackend;

    beforeEach(module('configuration.locale', function(_$translateProvider_) {
        $translateProvider = _$translateProvider_;
    }));

    beforeEach(inject(function(_$translate_, _$rootScope_, _$httpBackend_) {
        $translate = _$translate_;
        $rootScope = _$rootScope_;
        $httpBackend = _$httpBackend_;
        spyOn($translate, 'use').andCallThrough();
    }));


    it('should have "en" as the preferred language', function () {
        expect($translate.preferredLanguage()).toBe('en');
    });

    it('should load asynchronously the locale files', function () {
        $httpBackend.expectGET('i18n/locale-en.json').respond();
        $rootScope.$apply();
        $httpBackend.flush();

        $rootScope.changeLang('fr');
        $httpBackend.expectGET('i18n/locale-fr.json').respond();
        $rootScope.$apply();
        $httpBackend.flush();
    });


    describe('augments the $rootScope and', function () {

        it('should change the locale when $rootScope.changeLang is invoked', function () {
            $rootScope.changeLang('fr');
            expect($translate.use).toHaveBeenCalledWith('fr');
        });

        it('should define a $rootScope.isLang', function () {
            $translate.use.andReturn('fr');

            expect($rootScope.isLang('en')).toBe(false);
            expect($rootScope.isLang('fr')).toBe(true);
        });
    });


    describe('is listening to the auth.login and auth.logout events, and ', function () {

        it('should use the default preferred language on login when the user is not set or does not have a preferred language', function () {
            $rootScope.$broadcast('auth.login');
            $rootScope.$broadcast('auth.login', {});

            expect($translate.use).not.toHaveBeenCalled();
        });

        it('should use the user\'s preferred language on login', function () {
            $rootScope.$broadcast('auth.login', {lang: 'it'});

            expect($translate.use).toHaveBeenCalledWith('it');
        });

        it('should reset the language to the preferred one on logout', function () {
            $rootScope.$broadcast('auth.logout');

            expect($translate.use).toHaveBeenCalledWith('en');
        });
    });
});
