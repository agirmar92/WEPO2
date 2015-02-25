angular.module('chatApp').controller('indexController', [
	'$scope', '$location', '$rootScope', '$routeParams', 'socket',
	function ($scope, $location, $rootScope, $routeParams, socket) {
	// TODO: Get private messages.
	$rootScope.privateMessages = [];

	$rootScope.goToRooms = function() {
		$location.path('rooms/' + $scope.currentUser);
	};


}]);