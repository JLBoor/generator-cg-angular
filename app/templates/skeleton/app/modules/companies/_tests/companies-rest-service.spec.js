describe('The companiesRestService, ', function () {

    var companiesRestService;
    var $httpBackend;
    var company = {id: 7, name: 'doe'};
    var expectedOperationUrl = '//companies';

    beforeEach(module('companies'));

    beforeEach(inject(function(_companiesRestService_, _$httpBackend_) {
        companiesRestService = _companiesRestService_;
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
        companiesRestService.list();
        $httpBackend.expectGET(expectedOperationUrl).respond();
        $httpBackend.flush();
    });

    it('should implement a get service', function () {
        companiesRestService.get(company.id);
        $httpBackend.expectGET(expectedOperationUrl + '/' + company.id).respond();
        $httpBackend.flush();
    });

    it('should implement a create service', function () {
        companiesRestService.create(company);
        $httpBackend.expectPOST(expectedOperationUrl, company).respond();
        $httpBackend.flush();
    });

    it('should implement a update service', function () {
        companiesRestService.update(company);
        $httpBackend.expectPUT(expectedOperationUrl + '/'  + company.id, company).respond();
        $httpBackend.flush();
    });

    it('should implement a delete service', function () {
        companiesRestService.delete(company);
        $httpBackend.expectDELETE(expectedOperationUrl + '/' + company.id).respond();
        $httpBackend.flush();
    });

    it('should implement a default service', function () {
        expect(companiesRestService.default()).toEqual({name: 'New Company'});
    });

});
