chatApp.controller('loginController', function ($scope, $location, $rootScope, $routeParams, socket) {

	$scope.errorMessage = '';
	$scope.nickname = '';

	$scope.login = function() {
		if ($scope.nickname === '') {
			$scope.errorMessage = 'You have to choose a nickname!';
		} else {
			socket.emit('adduser', $scope.nickname, function (available) {
				if (available) {
					$location.path('/rooms/' + $scope.nickname);
				} else {
					$scope.errorMessage = 'Sorry, ' + $scope.nickname + ', but the nickname is already in use! Choose another.';
				}
			});
		}
	};
});