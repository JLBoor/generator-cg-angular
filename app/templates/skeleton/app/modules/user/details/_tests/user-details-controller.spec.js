describe('The userDetailsController, ', function () {

    var user;

    var userRestService;
    var $controller;
    var $state;
    var $scope;

    var _userDetailsController = function(user) {
        $controller('userDetailsController', {$scope: $scope, $state: $state, user: user, userRestService: userRestService});
    };

    beforeEach(module('user'));
    beforeEach(inject(function(_$rootScope_, _$controller_, _$state_, _userRestService_) {
        $scope = _$rootScope_.$new();
        $controller = _$controller_;
        $state = _$state_;
        userRestService= _userRestService_;

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
            spyOn(userRestService, 'create').andReturn(_$q_.when());
            spyOn(userRestService, 'update').andReturn(_$q_.when());
            spyOn(userRestService, 'delete').andReturn(_$q_.when());

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

            expect(userRestService.create).toHaveBeenCalledWith($scope.user);
        });

        it('should update the user when it is an existing user', function () {

            _userDetailsController(user);

            $scope.user.username = 'a';
            $scope.createOrUpdate();
            expect(userRestService.update).toHaveBeenCalledWith($scope.user);
        });

        it('should delete the user', function () {

            _userDetailsController(user);

            $scope.delete();

            expect(userRestService.delete).toHaveBeenCalledWith($scope.user);
        });

    });

});
