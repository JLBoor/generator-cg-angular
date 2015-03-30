describe('The userListController, ', function () {

    var filterableUsers = { data: [{id: 6, username: 'john'}, {id: 9, username: 'doe'}] };
    var $scope;

    beforeEach(module('user'));
    beforeEach(inject(function(_$rootScope_, _$controller_) {
        $scope = _$rootScope_.$new();

        _$controller_('userListController', {$scope: $scope, filterableUsers: filterableUsers});
    }));


    it('should add users to the $scope', function () {
        expect($scope.filterableUsers).toBe(filterableUsers);
    });

});
