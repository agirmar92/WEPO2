angular.module('chatApp').controller('indexController', [
	'$scope', '$location', '$rootScope', '$routeParams', 'socket',
	function ($scope, $location, $rootScope, $routeParams, socket) {
	// TODO: Get private messages.
	$rootScope.privateMessages = [];

	$rootScope.goToRooms = function() {
		$location.path('rooms/' + $scope.currentUser);
	};

		$rootScope.depart = function(room) {
		if (room !== undefined) {
			socket.emit('partroom', room);
			console.log("room");
			console.log(room);
		} else {
			socket.emit('partroom', $scope.currentRoom);
			console.log("$scope.currentRoom");
			console.log($scope.currentRoom);
		}
	};
}]);