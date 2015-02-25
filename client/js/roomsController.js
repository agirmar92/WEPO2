angular.module('chatApp').controller('roomsController', [
	'$scope', '$location', '$rootScope', '$routeParams', 'socket',
	function ($scope, $location, $rootScope, $routeParams, socket) {
	// TODO: Query chat server for active rooms
	$scope.currentUser = $routeParams.user;
	$scope.newRoomName = '';
	$scope.errorMessage = '';

	// When user presses Enter, add a room.
	$("#roomNameInput").keypress(function(e) {
		if(e.which == 13) {
			$scope.addRoom();
		}
	});

	$scope.displayAddRoom = function() {
		$location.path('/addroom/' + $scope.currentUser);
	};

	$scope.addRoom = function() {
		var newRoom = {room:  $scope.newRoomName,
					   pass:  undefined};
		newRoom.room = $scope.newRoomName;

		socket.emit('joinroom', newRoom, function (success, roomExists, reason) {
			if (roomExists) {
				console.log("Room Exists");
				$scope.errorMessage = 'This room already exists. Please choose another name.'
				$rootScope.depart($scope.newRoomName);
			} else {
				$location.path('/room/' + $scope.currentUser + '/' + $scope.newRoomName);
			}
		});

		$location.path('/rooms/' + $scope.currentUser);
	};

	$scope.refreshRooms = function() {
		socket.emit('rooms');
	};

	socket.on('roomlist', function(newRooms) {
		$scope.rooms = Object.keys(newRooms);
	});
}]);