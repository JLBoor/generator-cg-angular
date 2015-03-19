describe('The usersListController, ', function () {

    var user;

    var usersRestService;
    var $controller;
    var $state;
    var $scope;

    var _userDetailsController = function(user) {
        $controller('usersDetailsController', {$scope: $scope, $state: $state, user: user, usersRestService: usersRestService});
    };

    beforeEach(module('users'));
    beforeEach(inject(function(_$rootScope_, _$controller_, _$state_, _usersRestService_) {
        $scope = _$rootScope_.$new();
        $controller = _$controller_;
        $state = _$state_;
        usersRestService= _usersRestService_;

        user = {id: 7, username: 'doe'};
    }));


    it('should add the user to the $scope', function () {
        _userDetailsController(user);
        expect($scope.user).toBe(user);
    });

    it('should set $scope.isEditing when the user exists', function () {
        _userDetailsController(user);
        expect($scope.isEditing).toBeTruthy();
    });

    it('should not set $scope.isEditing when the user does not exist', function () {
        _userDetailsController(undefined);
        expect($scope.isEditing).toBeFalsy();
    });

    it('should not set $scope.isEditing when the user does not have an id', function () {
        _userDetailsController({username: 'x'});
        expect($scope.isEditing).toBeFalsy();
    });


    describe('when an rest call is made, should transition to the user list and', function () {

        beforeEach(inject(function(_$q_) {
            spyOn(usersRestService, 'create').andReturn(_$q_.when());
            spyOn(usersRestService, 'update').andReturn(_$q_.when());
            spyOn(usersRestService, 'delete').andReturn(_$q_.when());

            spyOn($state, 'go');
        }));

        afterEach(inject(function() {
            $scope.$apply();
            expect($state.go).toHaveBeenCalledWith('^.list');
        }));

        it('should create the user when it is a new user', function () {
            _userDetailsController(undefined);
            expect($scope.user).toBeUndefined();

            $scope.user = {username: 'h'};
            $scope.createOrUpdate();

            expect(usersRestService.create).toHaveBeenCalledWith($scope.user);
        });

        it('should update the user when it is an existing user', function () {

            _userDetailsController(user);

            $scope.user.username = 'a';
            $scope.createOrUpdate();
            expect(usersRestService.update).toHaveBeenCalledWith($scope.user);
        });

        it('should delete the user', function () {

            _userDetailsController(user);

            $scope.delete();

            expect(usersRestService.delete).toHaveBeenCalledWith($scope.user);
        });

    });

});
