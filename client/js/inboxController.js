angular.module('chatApp').controller('inboxController', function ($scope, $location, $rootScope, $routeParams, socket) {
	// TODO: Get private messages.
	$scope.currentUser = $routeParams.user;
	$scope.recipient = '';
	$scope.messageText = '';

	socket.on('recv_privatemsg', function(username, recvdMessage) {
		var msgObj = {nick: username, message: recvdMessage, timestamp: Date.now()};
		if (msgObj.nick == $scope.currentUser) {
			$rootScope.privateMessages.push(msgObj);
		}
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
		socket.emit('privatemsg',msgObj);
	};
});