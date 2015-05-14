describe('The companyDetailsController, ', function () {

    var company;

    var companyRestService;
    var $controller;
    var $state;
    var $scope;

    var _companyDetailsController = function(company) {
        $controller('companyDetailsController', {$scope: $scope, $state: $state, company: company, companyRestService: companyRestService});
    };

    beforeEach(module('company'));
    beforeEach(inject(function(_$rootScope_, _$controller_, _$state_, _companyRestService_) {
        $scope = _$rootScope_.$new();
        $controller = _$controller_;
        $state = _$state_;
        companyRestService = _companyRestService_;

        company = {id: 7, name: 'doe'};
    }));


    it('should add the company to the $scope', function () {
        _companyDetailsController(company);
        expect($scope.company).toBe(company);
    });

    it('should set $scope.isEditing when the company exists', function () {
        _companyDetailsController(company);
        expect($scope.isEditing).toBeTruthy();
    });

    it('should not set $scope.isEditing when the company does not exist', function () {
        _companyDetailsController(undefined);
        expect($scope.isEditing).toBeFalsy();
    });

    it('should not set $scope.isEditing when the company does not have an id', function () {
        _companyDetailsController({name: 'x'});
        expect($scope.isEditing).toBeFalsy();
    });


    describe('when an rest call is made, should transition to the company list and', function () {

        beforeEach(inject(function(_$q_) {
            spyOn(companyRestService, 'createOrUpdate').andReturn(_$q_.when());
            spyOn(companyRestService, 'delete').andReturn(_$q_.when());

            spyOn($state, 'go');
        }));

        afterEach(inject(function() {
            $scope.$apply();
            expect($state.go).toHaveBeenCalledWith('^.list');
        }));

        it('should create the company when it is a new company', function () {
            _companyDetailsController(undefined);
            expect($scope.company).toBeUndefined();

            $scope.company = {name: 'h'};
            $scope.image = "image";
            $scope.isEditing = false;
            $scope.createOrUpdate();

            expect(companyRestService.createOrUpdate).toHaveBeenCalledWith($scope.company, "image", false);
        });

        it('should update the company when it is an existing company', function () {
            _companyDetailsController(company);

            $scope.company.name = 'a';
            $scope.image = "image";
            $scope.isEditing = true;
            $scope.createOrUpdate();
            expect(companyRestService.createOrUpdate).toHaveBeenCalledWith($scope.company, "image", true);
        });

        it('should delete the company', function () {
            _companyDetailsController(company);

            $scope.delete();

            expect(companyRestService.delete).toHaveBeenCalledWith($scope.company);
        });

    });

});
