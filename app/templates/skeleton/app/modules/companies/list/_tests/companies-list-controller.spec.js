describe('The companiesListController, ', function () {

    var companies = [{id: 6, name: 'john'}, {id: 9, name: 'doe'}];
    var $scope;

    beforeEach(module('companies'));
    beforeEach(inject(function(_$rootScope_, _$controller_) {
        $scope = _$rootScope_.$new();

        _$controller_('companiesListController', {$scope: $scope, companies: companies});
    }));


    it('should add companies to the $scope', function () {
        expect($scope.companies).toBe(companies);
    });

});
