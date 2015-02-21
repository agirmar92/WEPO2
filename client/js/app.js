var chatApp = angular.module("chatApp", ['ngRoute']);

chatApp.config(
	function ($routeProvider) {
		$routeProvider
			.when('/login', { templateUrl: 'login.html', controller: 'loginController' })
			.when('/addroom/:user/', { templateUrl: 'addroom.html', controller: 'roomsController' })
			.when('/rooms/:user/', { templateUrl: 'rooms.html', controller: 'roomsController' })
			.when('/room/:user/:room/', { templateUrl: 'room.html', controller: 'roomController' })
			.otherwise({
				redirectTo: '/login'
			});
	}
);