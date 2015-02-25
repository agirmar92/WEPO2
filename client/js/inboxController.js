angular.module('chatApp').controller('inboxController', [
	'$scope', '$location', '$rootScope', '$routeParams', 'socket', 
	function ($scope, $location, $rootScope, $routeParams, socket) {
	// TODO: Get private messages.
	$scope.currentUser = $routeParams.user;
	$scope.recipient = $routeParams.recipient;
	$scope.messageText = '';

	socket.on('recv_privatemsg', function(messages) {
		$rootScope.privateMessages = messages;
		console.log($rootScope.privateMessages);
		$rootScope.unreadCount++;
	});

	$scope.goToRooms = function() {
		$location.path('rooms/' + $scope.currentUser);
	};

	$scope.displayNewMessage = function(recipient) {
		if (recipient != null) {
			$location.path('inbox/newmessage/' + $scope.currentUser + '/' + recipient);
		} else {
			$location.path('inbox/newmessage/' + $scope.currentUser);
		}
	};

	$scope.sendPrivateMessage = function() {
		var msgObj = {nick: $scope.recipient, message: $scope.messageText};
		socket.emit('privatemsg',msgObj);
		$location.path('inbox/' + $scope.currentUser);
	};
}]);
