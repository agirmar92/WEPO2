angular.module('chatApp').controller('loginController', [
	'$scope', '$location', '$rootScope', '$routeParams', 'socket',
	function ($scope, $location, $rootScope, $routeParams, socket) {

	$scope.errorMessage = '';
	$scope.nickname = '';

	// When user presses Enter, log in.
	$("#nickname").keypress(function(e) {
		if(e.which == 13) {
			$scope.login();
		}
	});

	$scope.login = function() {
		if ($scope.nickname === '') {
			$scope.errorMessage = 'The empty string is NOT a valid nickname!';
		} else {
			socket.emit('adduser', $scope.nickname, function (available) {
				if (available) {
					$rootScope.user = $scope.nickname;
					$rootScope.unreadCount = 0;
					$location.path('/rooms/' + $scope.nickname);
				} else {
					$scope.errorMessage = 'Sorry, ' + $scope.nickname + ', but someone has nicked your nick and is using it right now! Please choose another nick.';
				}
			});
		}
	};

	$rootScope.logout = function() {
		$location.path('/');
		socket.emit('disco-net');
		$rootScope.user = '';
		$rootScope.privateMessages = [];
	};
}]);
