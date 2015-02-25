angular.module('chatApp', ['ngRoute']);

angular.module('chatApp').config(['$routeProvider', 
	function ($routeProvider) {
		$routeProvider
			.when('/login',             { templateUrl: 'login.html',   controller: 'loginController' })
			.when('/inbox/:user',       { templateUrl: 'inbox.html',   controller: 'inboxController' })
			.when('/inbox/newmessage/:user', { templateUrl: 'privatemessage.html',   controller: 'inboxController' })
			.when('/inbox/newmessage/:user/:recipient', { templateUrl: 'privatemessage.html',   controller: 'inboxController' })
			.when('/addroom/:user/',    { templateUrl: 'addroom.html', controller: 'roomsController' })
			.when('/rooms/:user/',      { templateUrl: 'rooms.html',   controller: 'roomsController' })
			.when('/room/:user/:room/', { templateUrl: 'room.html',    controller: 'roomController' })
			.otherwise({
				redirectTo: '/login'
			});
	}
]);
