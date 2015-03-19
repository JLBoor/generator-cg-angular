describe('The companiesListController, ', function () {

    var company;

    var companiesRestService;
    var $controller;
    var $state;
    var $scope;

    var _companiesDetailsController = function(company) {
        $controller('companiesDetailsController', {$scope: $scope, $state: $state, company: company, companiesRestService: companiesRestService});
    };

    beforeEach(module('companies'));
    beforeEach(inject(function(_$rootScope_, _$controller_, _$state_, _companiesRestService_) {
        $scope = _$rootScope_.$new();
        $controller = _$controller_;
        $state = _$state_;
        companiesRestService = _companiesRestService_;

        company = {id: 7, name: 'doe'};
    }));


    it('should add the company to the $scope', function () {
        _companiesDetailsController(company);
        expect($scope.company).toBe(company);
    });

    it('should set $scope.isEditing when the company exists', function () {
        _companiesDetailsController(company);
        expect($scope.isEditing).toBeTruthy();
    });

    it('should not set $scope.isEditing when the company does not exist', function () {
        _companiesDetailsController(undefined);
        expect($scope.isEditing).toBeFalsy();
    });

    it('should not set $scope.isEditing when the company does not have an id', function () {
        _companiesDetailsController({name: 'x'});
        expect($scope.isEditing).toBeFalsy();
    });


    describe('when an rest call is made, should transition to the company list and', function () {

        beforeEach(inject(function(_$q_) {
            spyOn(companiesRestService, 'create').andReturn(_$q_.when());
            spyOn(companiesRestService, 'update').andReturn(_$q_.when());
            spyOn(companiesRestService, 'delete').andReturn(_$q_.when());

            spyOn($state, 'go');
        }));

        afterEach(inject(function() {
            $scope.$apply();
            expect($state.go).toHaveBeenCalledWith('^.list');
        }));

        it('should create the company when it is a new company', function () {
            _companiesDetailsController(undefined);
            expect($scope.company).toBeUndefined();

            $scope.company = {name: 'h'};
            $scope.createOrUpdate();

            expect(companiesRestService.create).toHaveBeenCalledWith($scope.company);
        });

        it('should update the company when it is an existing company', function () {
            _companiesDetailsController(company);

            $scope.company.name = 'a';
            $scope.createOrUpdate();
            expect(companiesRestService.update).toHaveBeenCalledWith($scope.company);
        });

        it('should delete the company', function () {
            _companiesDetailsController(company);

            $scope.delete();

            expect(companiesRestService.delete).toHaveBeenCalledWith($scope.company);
        });

    });

});
