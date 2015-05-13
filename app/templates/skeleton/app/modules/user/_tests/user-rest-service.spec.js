describe('The userRestService, ', function () {

    var userRestService;
    var $httpBackend;
    var user = {id: 7, username: 'doe'};
    var userOperationUrl = '//users';

    beforeEach(module('user'));

    beforeEach(inject(function(_userRestService_, _$httpBackend_) {
        userRestService = _userRestService_;
        $httpBackend = _$httpBackend_;
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    afterEach(inject(function(_$rootScope_) {
       _$rootScope_.$apply();
    }));

    it('should implement a list service', function () {
        userRestService.list();
        $httpBackend.expectGET(userOperationUrl).respond();
        $httpBackend.flush();
    });

    it('should implement a get service', function () {
        userRestService.get(user.id);
        $httpBackend.expectGET(userOperationUrl + '/' + user.id).respond();
        $httpBackend.flush();
    });

    it('should implement a create service', function () {
        userRestService.create(user);
        $httpBackend.expectPOST(userOperationUrl + '/' + user.id, user).respond();
        $httpBackend.flush();
    });

    it('should implement a update service', function () {
        userRestService.update(user);
        $httpBackend.expectPUT(userOperationUrl + '/'  + user.id, user).respond();
        $httpBackend.flush();
    });

    it('should implement a delete service', function () {
        userRestService.delete(user);
        $httpBackend.expectDELETE(userOperationUrl + '/'  + user.id).respond();
        $httpBackend.flush();
    });

    it('should implement a default service', function () {
        userRestService.default();
        $httpBackend.expectGET(userOperationUrl + '/-1').respond();
        $httpBackend.flush();
    });

});
