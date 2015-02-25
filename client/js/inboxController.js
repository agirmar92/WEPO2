angular.module('chatApp').controller('inboxController', [
	'$scope', '$location', '$rootScope', '$routeParams', 'socket', 
	function ($scope, $location, $rootScope, $routeParams, socket) {
	// TODO: Get private messages.
	$scope.currentUser = $routeParams.user;
	$scope.recipient = $routeParams.recipient;
	$scope.messageText = '';

	socket.on('recv_privatemsg', function(username, recvdMessage) {
		var msgObj = {nick: username, message: recvdMessage, timestamp: Date.now()};
		$rootScope.privateMessages.push(msgObj);
		console.log($rootScope.privateMessages);
		$rootScope.unreadCount++;
	});

	$scope.goToRooms = function() {
		$location.path('rooms/' + $scope.currentUser);
	};

	$scope.displayNewMessage = function() {
		$location.path('inbox/newmessage/' + $scope.currentUser);
	};

	$scope.sendPrivateMessage = function() {
		var msgObj = {nick: $scope.recipient, message: $scope.messageText};
		if($scope.currentUser === $scope.recipient) {
			console.log("You can't send a message to yourself.");
			return;
		}
		socket.emit('privatemsg',msgObj, function(userExists) {
			if(userExists) {
				console.log("User Exists");
			} else {
				console.log("User does not exist");
			}
		});
		$location.path('inbox/' + $scope.currentUser);
	};

	$scope.$on('$destroy', function() {
		console.log("Dying controller");
	})
}]);
