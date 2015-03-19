describe('The usersRestService, ', function () {

    var usersRestService;
    var $httpBackend;
    var user = {id: 7, username: 'doe'};
    var usersOperationUrl = '//users';

    beforeEach(module('users'));

    beforeEach(inject(function(_usersRestService_, _$httpBackend_) {
        usersRestService = _usersRestService_;
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
        usersRestService.list();
        $httpBackend.expectGET(usersOperationUrl).respond();
        $httpBackend.flush();
    });

    it('should implement a get service', function () {
        usersRestService.get(user.id);
        $httpBackend.expectGET(usersOperationUrl + '/' + user.id).respond();
        $httpBackend.flush();
    });

    it('should implement a create service', function () {
        usersRestService.create(user);
        $httpBackend.expectPOST(usersOperationUrl + '/' + user.id, user).respond();
        $httpBackend.flush();
    });

    it('should implement a update service', function () {
        usersRestService.update(user);
        $httpBackend.expectPUT(usersOperationUrl + '/'  + user.id, user).respond();
        $httpBackend.flush();
    });

    it('should implement a delete service', function () {
        usersRestService.delete(user);
        $httpBackend.expectDELETE(usersOperationUrl + '/'  + user.id).respond();
        $httpBackend.flush();
    });

    it('should implement a default service', function () {
        usersRestService.default();
        $httpBackend.expectGET(usersOperationUrl + '/0').respond();
        $httpBackend.flush();
    });

});
