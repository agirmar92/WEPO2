angular.module('chatApp').controller('loginController', function ($scope, $location, $rootScope, $route, $routeParams, socket) {

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
		socket.emit('disconnect');
		$rootScope.user = '';
		$route.reload();
	};
});