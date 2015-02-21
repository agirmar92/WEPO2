chatApp.controller('roomController', function ($scope, $location, $rootScope, $routeParams, socket) {
	$scope.currentRoom = $routeParams.room;
	$scope.currentUser = $routeParams.user;
	$scope.currentTopic = "";
	$scope.messages = [];
	$scope.currentUsers = [];
	$scope.errorMessage = '';

	socket.on('updateusers', function (roomName, users, ops) {
		// TODO: Check if the roomName equals the current room !
		$scope.currentUsers = users;
	});


	socket.on('updatetopic', function (roomName, topic, username) {
		// TODO: Check if the roomName equals the current room !
		if(roomName === $scope.currentRoom) {
			$scope.currentTopic = topic;
		}
	});

	socket.on('updatechat', function (roomName, messages) {
		// TODO: Check if the roomName equals the current room !
		console.log(roomName);
		console.log(messages);
		if(roomName === $scope.currentRoom) {
			$scope.messages = messages.slice().reverse();
			for (var i = 0; i < $scope.messages.length; i++) {
				$scope.messages[i].date = new Date($scope.messages[i].timestamp);
			};
		}
	});

	$scope.sendChatMessage = function() {
		var message = {roomName: $scope.currentRoom, msg: $("#messageBox").val()}
		socket.emit('sendmsg', message);
		$("#messageBox").val("");
	}

	$scope.formatDate = function(date) {
		var d = new Date(date);
		var sec  = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();
		var min  = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
		var hour = d.getHours()   < 10 ? '0' + d.getHours()   : d.getHours();
		var day  = d.getDate()    < 10 ? '0' + d.getDate()    : d.getDate();
		var mnth = d.getMonth()+1 < 10 ? '0' + (d.getMonth()+1) : (d.getMonth()+1);
		var year = d.getFullYear();

		return day + '.' + mnth + '.' + year + ' - ' + hour + ':' + min + ':' + sec;
	}

	var joinObj = {room: $routeParams.room, pass: ""}
	socket.emit('joinroom', joinObj, function (success, reason) {
		if (!success) {
			// WHY DID I NOT GET IN?!?!
			$scope.errorMessage = reason;
		}
	})
});