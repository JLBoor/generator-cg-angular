describe('The <%= _.camelize(name) %>', function() {

    var <%= _.camelize(name) %>;
    var $httpBackend;
    var <%= _.camelize(entityName) %>;
    var expectedOperationUrl = '/baseUrl<%= restOperation %>';

    beforeEach(module('<%= appname %>'));
    beforeEach(module('configuration.rest', function(_restConfigServiceProvider_) {
        _restConfigServiceProvider_.setBaseUrl('/baseUrl');
    }));

    beforeEach(inject(function(_<%= _.camelize(name) %>_, _$httpBackend_) {
        <%= _.camelize(name) %> = _<%= _.camelize(name) %>_;
        $httpBackend = _$httpBackend_;

        <%= _.camelize(entityName) %> = {id: 7, prop: 'value'};
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    afterEach(inject(function(_$rootScope_) {
        _$rootScope_.$apply();
    }));

    it('should implement a list service', function () {
        <%= _.camelize(name) %>.list();
        $httpBackend.expectGET(expectedOperationUrl).respond();
        $httpBackend.flush();
    });

    it('should implement a get service', function () {
        <%= _.camelize(name) %>.get(<%= _.camelize(entityName) %>.id);
        $httpBackend.expectGET(expectedOperationUrl + '/' + <%= _.camelize(entityName) %>.id).respond();
        $httpBackend.flush();
    });

    it('should implement a create service', function () {
        delete <%= _.camelize(entityName) %>.id;
        <%= _.camelize(name) %>.create(<%= _.camelize(entityName) %>);
        $httpBackend.expectPOST(expectedOperationUrl, <%= _.camelize(entityName) %>).respond();
        $httpBackend.flush();
    });

    it('should implement a update service', function () {
        <%= _.camelize(name) %>.update(<%= _.camelize(entityName) %>);
        $httpBackend.expectPUT(expectedOperationUrl + '/'  + <%= _.camelize(entityName) %>.id, <%= _.camelize(entityName) %>).respond();
        $httpBackend.flush();
    });

    it('should implement a delete service', function () {
        <%= _.camelize(name) %>.delete(<%= _.camelize(entityName) %>);
        $httpBackend.expectDELETE(expectedOperationUrl + '/'  + <%= _.camelize(entityName) %>.id).respond();
        $httpBackend.flush();
    });

});
