describe('The rest module, ', function () {

    var baseUrl = '/base';
    var identityOperation = '/me';
    var authenticationOperation = '/auth';
    var restConfigService;

    beforeEach(module('configuration.rest', function(_restConfigServiceProvider_) {
        _restConfigServiceProvider_.setBaseUrl(baseUrl);
        _restConfigServiceProvider_.setIdentityOperation(identityOperation);
    }));

    beforeEach(inject(function(_restConfigService_) {
        restConfigService = _restConfigService_;
    }));


    describe('has a restConfigService that', function () {

        it('should build the identity operation', function () {
            expect(restConfigService.getIdentityOperation()).toBe(baseUrl + identityOperation);
        });

        it('should build a custom operation', function () {
            var operation1 = '/operation1';
            expect(restConfigService.getOperation(operation1)).toBe(baseUrl + operation1);
        });

    });

});
