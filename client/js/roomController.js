angular.module('chatApp').controller('roomController', [
	'$scope', '$location', '$rootScope', '$routeParams', 'socket', '$timeout',
	function ($scope, $location, $rootScope, $routeParams, socket, $timeout) {
	$scope.currentRoom = $routeParams.room;
	$scope.currentUser = $routeParams.user;
	$scope.currentTopic = "";
	$scope.messages = [];
	$scope.currentUsers = [];
	$scope.errorMessage = '';
	$scope.messageText = '';

	// Updates the user list on the right when this signal is received.
	socket.on('updateusers', function (roomName, users, ops) {
		if(roomName === $scope.currentRoom) {
			$scope.currentUsers = users;
		}
	});

	// When user presses Enter, send message.
	$("#messageBox").keypress(function(e) {
		if(e.which == 13) {
			$scope.sendChatMessage();
		}
	});

	socket.on('updatetopic', function (roomName, topic, username) {
		if(roomName === $scope.currentRoom) {
			$scope.currentTopic = topic;
		}
	});

	// Update all chat messages for a particular room.
	socket.on('updatechat', function (roomName, messages) {
		if(roomName === $scope.currentRoom) {
			// Update the message list and reverse it to
			// display the newest message on top.
			$scope.messages = messages.slice().reverse();
		}
	});

	socket.on('kicked', function(room, kickedUser, kicker) {
		if(kickedUser == $scope.currentUser) {
			$location.path('/rooms/' + $scope.currentUser);
		}
	});

	socket.on('banned', function(room, bannedUser, banner) {
		if(bannedUser == $scope.currentUser) {
			$location.path('/rooms/' + $scope.currentUser);
		}
	});

	$scope.sendChatMessage = function() {
		var message = {roomName: $scope.currentRoom, msg: $scope.messageText};
		socket.emit('sendmsg', message);
		$("#messageBox").val("");
		$("#messageBox").focus();
	};

	$scope.formatDate = function(date) {
		var d = new Date(date);
		var sec  = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();
		var min  = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
		var hour = d.getHours()   < 10 ? '0' + d.getHours()   : d.getHours();
		var day  = d.getDate()    < 10 ? '0' + d.getDate()    : d.getDate();
		var mnth = d.getMonth()+1 < 10 ? '0' + (d.getMonth()+1) : (d.getMonth()+1);
		var year = d.getFullYear();

		return day + '.' + mnth + '.' + year + ' - ' + hour + ':' + min + ':' + sec;
	};

	$scope.kickUser = function(userToKick) {
		var kickObj = {user: userToKick, room: $scope.currentRoom};
		socket.emit('kick', kickObj, function(wasKicked) {
			if (wasKicked) {
				console.log("User " + userToKick + " kicked from room " + $scope.currentRoom);
			} else {
				$scope.errorMessage = 'You do not have the rights to kick the user.';
				$timeout(function(){$scope.errorMessage = ''},3000);
			}
		});
	};

	$scope.banUser = function(userToBan) {
		var banObj = {user: userToBan, room: $scope.currentRoom};
		socket.emit('ban', banObj, function(wasBanned) {
			if (wasBanned) {
				console.log("User " + userToBan + " banned from room " + $scope.currentRoom);
			} else {
				$scope.errorMessage = 'You do not have the rights to ban the user.';
				$timeout(function(){$scope.errorMessage = ''}, 3000);
			}
		});
	};

	$scope.sendPM = function(userRecipient) {
		console.log(userRecipient);
		$location.path('inbox/newmessage/' + $scope.currentUser + '/' + userRecipient);
	};

	$rootScope.depart = function(room) {
		if (room !== undefined) {
			socket.emit('partroom', room);
			console.log("room");
			console.log(room);
		} else {
			socket.emit('partroom', $scope.currentRoom);
			console.log("$scope.currentRoom");
			console.log($scope.currentRoom);
		}
	};

	var joinObj = {room: $routeParams.room, pass: ""};
	socket.emit('joinroom', joinObj, function (success, roomExists, reason) {
		if (!success) {
			// WHY DID I NOT GET IN?!?!
			if(reason === 'banned') {
				$scope.errorMessage = 'Sorry, ' + $scope.currentUser + ', but you have been banned from this room.';
				$timeout(function(){$location.path('rooms/' + $scope.currentUser);},3000);
			} else {
				$scope.errorMessage = reason;
			}
		} else {
			$("#messageBox").focus();
		}
	});

	$scope.$on('$destroy', function() {
		if ($rootScope.user !== ''){
			$scope.depart();
		}
	});

}]);
