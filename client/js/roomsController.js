chatApp.controller('roomsController', function ($scope, $location, $rootScope, $routeParams, socket) {
	// TODO: Query chat server for active rooms
	angular.element(document).ready(function() {
		$scope.refreshRooms();
		$("#roomNameInput").focus();
	});

	$scope.rooms;
	$scope.currentUser = $routeParams.user;
	$scope.newRoomName = '';

	// When user presses Enter, add a room.
	$("#roomNameInput").keypress(function(e) {
		if(e.which == 13) $scope.addRoom();
	});

	$scope.displayAddRoom = function() {
		$location.path('/addroom/' + $scope.currentUser);
	};

	$scope.addRoom = function() {
		var newRoom = {room:  $scope.newRoomName,
					   pass:  undefined};
		newRoom.room = $scope.newRoomName;

		socket.emit('joinroom', newRoom, function (success, reason) {
			if (success) {
				$scope.refreshRooms();
			} else {
				console.log("Error");
				console.log(reason);
			}
		});

		$location.path('/rooms/' + $scope.currentUser);
	}

	$scope.refreshRooms = function() {
		socket.emit('rooms');
	}

	socket.on('roomlist', function(newRooms) {
		$scope.rooms = Object.keys(newRooms);
	});
});