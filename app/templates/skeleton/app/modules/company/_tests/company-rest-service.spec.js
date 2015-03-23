describe('The companyRestService, ', function () {

    var companyRestService;
    var $httpBackend;
    var company = {id: 7, name: 'doe'};
    var expectedOperationUrl = '//companies';

    beforeEach(module('company'));

    beforeEach(inject(function(_companyRestService_, _$httpBackend_) {
        companyRestService = _companyRestService_;
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
        companyRestService.list();
        $httpBackend.expectGET(expectedOperationUrl).respond();
        $httpBackend.flush();
    });

    it('should implement a get service', function () {
        companyRestService.get(company.id);
        $httpBackend.expectGET(expectedOperationUrl + '/' + company.id).respond();
        $httpBackend.flush();
    });

    it('should implement a create service', function () {
        companyRestService.create(company);
        $httpBackend.expectPOST(expectedOperationUrl, company).respond();
        $httpBackend.flush();
    });

    it('should implement a update service', function () {
        companyRestService.update(company);
        $httpBackend.expectPUT(expectedOperationUrl + '/'  + company.id, company).respond();
        $httpBackend.flush();
    });

    it('should implement a delete service', function () {
        companyRestService.delete(company);
        $httpBackend.expectDELETE(expectedOperationUrl + '/' + company.id).respond();
        $httpBackend.flush();
    });

    it('should implement a default service', function () {
        expect(companyRestService.default()).toEqual({name: 'New Company'});
    });

});
