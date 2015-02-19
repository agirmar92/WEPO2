var chatApp = angular.module("chatApp", ['ngRoute']);

chatApp.config(
	function ($routeProvider) {
		$routeProvider
			.when('/login', { templateUrl: 'login.html', controller: 'loginController' })
			.when('/rooms/:user/', { templateUrl: 'rooms.html', controller: 'roomsController' })
			.when('/room/:user/:room/', { templateUrl: 'room.html', controller: 'roomController' })
			.otherwise({
				redirectTo: '/login'
			});
	}
);

chatApp.controller('loginController', function ($scope, $location, $rootScope, $routeParams, socket) {

	$scope.errorMessage = '';
	$scope.nickname = '';

	$scope.login = function() {
		if ($scope.nickname === '') {
			$scope.errorMessage = 'You have to choose a nickname!';
		} else {
			socket.emit('adduser', $scope.nickname, function (available) {
				if (available) {
					$location.path('/rooms/' + $scope.nickname);
				} else {
					$scope.errorMessage = 'Sorry, ' + $scope.nickname + ', but the nickname is already in use! Choose another.';
				}
			});
		}
	};
});

chatApp.controller('roomsController', function ($scope, $location, $rootScope, $routeParams, socket) {
	// TODO: Query chat server for active rooms
	$scope.rooms = ['Room 1', 'Room 2', 'Room 3', 'Room 4', 'Room 5'];
	$scope.currentUser = $routeParams.user;
});

chatApp.controller('roomController', function ($scope, $location, $rootScope, $routeParams, socket) {
	$scope.currentRoom = $routeParams.room;
	$scope.currentUser = $routeParams.user;
	$scope.currentUsers = [];
	$scope.errorMessage = '';

	socket.on('updateusers', function (roomName, users, ops) {
		// TODO: Check if the roomName equals the current room !
		$scope.currentUsers = users;
	});

	socket.emit('joinroom', $scope.currentRoom, function (success, reason) {
		if (!success) {
			// WHY DID I NOT GET IN?!?!
			$scope.errorMessage = reason;
		}
	})
});
