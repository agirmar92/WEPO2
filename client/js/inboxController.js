angular.module('chatApp').controller('inboxController', [
	'$scope', '$location', '$rootScope', '$routeParams', 'socket', 
	function ($scope, $location, $rootScope, $routeParams, socket) {
	// TODO: Get private messages.
	$scope.currentUser = $routeParams.user;
	$scope.recipient = $routeParams.recipient;
	$scope.messageText = '';
	$scope.errorMessage = '';
	$scope.successMessage = '';

	socket.on('recv_privatemsg', function(messages) {
		if (messages.length !== $rootScope.privateMessages.length || $rootScope.unreadCount === 0) {
			$rootScope.unreadCount++;
		}
		$rootScope.privateMessages = messages;
		console.log($rootScope.privateMessages);
	});

	$scope.resetCounter = function() {
		$rootScope.unreadCount = 0;
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
		if($scope.currentUser === $scope.recipient) {
			$scope.errorMessage = 'You can\'t send a message to yourself.';
			return;
		}
		socket.emit('privatemsg',msgObj, function(userExists) {
			if(!userExists) {
				$scope.errorMessage = 'The user you tried to send a message to does not exist.';
				return;
			} else {
				$location.path('inbox/' + $scope.currentUser);
			}
		});
	};
}]);
