var chatApp = angular.module("MyHelloWorldApp", []);

angular.module("MyHelloWorldApp").controller("HelloController", function($scope){
	$scope.message = "Hello World";
});