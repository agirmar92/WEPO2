var chatApp = angular.module("chatApp", ['ngRoute']);

chatApp.config(
	function ($routeProvider) {
		$routeProvider
			.when('/login', { templateUrl: 'login.html', controller: 'loginController' })
			.when('/rooms/:user/', { templateUrl: 'rooms.html', controller: 'roomsController' })
			.when('/room/:user/:room/', { templateUrl: 'room.html', controller: 'roomController' })
			.otherwise({
				redirectTo: '/login'
			});
	}
);