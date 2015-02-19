var chatApp = angular.module("chatApp", ['ngRoute']);

chatApp.config(
	function ($routeProvider) {
		$routeProvider
			.when('/login', { templateUrl: 'client/login.html', controller: 'loginController' })
			.when('/rooms/:user/', { templateUrl: 'client/rooms.html', controller: 'roomsController' })
			.when('/room/:user/:room/', { templateUrl: 'client/room.html', controller: 'roomController' })
			.otherwise({
				redirectTo: '/login'
			});
	}
);