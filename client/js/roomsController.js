chatApp.controller('roomsController', function ($scope, $location, $rootScope, $routeParams, socket) {
	// TODO: Query chat server for active rooms
	angular.element(document).ready(function () {
        console.log("ELEMENTING...")
		$scope.refreshRooms();
    });

	$scope.rooms;
	$scope.currentUser = $routeParams.user;

	$scope.displayAddRoom = function() {
		$location.path('/addroom/' + $scope.currentUser);
	};
	
	socket.on('roomlist', function(newRooms) {
		$scope.rooms = Object.keys(newRooms);
		console.log(Object.keys(newRooms));
	});
	
	$scope.refreshRooms = function() {
		socket.emit('rooms');
	}

	$scope.addRoom = function() {
		var bla = {room: undefined,
		           pass: undefined};
		bla.room = $("#exampleInputEmail1").val();
		socket.emit('joinroom', bla, function (success, reason) {
			console.log($scope.rooms);
			if (success) {
				$scope.refreshRooms();
			} else {
				console.log("Error");
			}
		});
		console.log($scope.rooms);

		$location.path('/rooms/' + $scope.currentUser);
	}
});