'use strict';

/**
 * @ngdoc function
 * @name feedMeWebApp.controller:DetailselfCtrl
 * @description
 * # DetailselfCtrl
 * Controller of the feedMeWebApp
 */
 var app = angular.module('feedMeWebApp');

 app.controller('DetailselfCtrl', ['$cookies', '$scope', '$http', function  ($cookies, $scope, $http) {

 	var url = 'http://163.5.84.232/WebService/api/Account/UserInfo';

 	var request = {
 		method: 'GET',
 		url: url,
 		headers: 	{
 			'Content-Type': 'application/json;charset=utf-8',
 			'Authorization': 'Bearer '+ $cookies.get("feedmetoken"),
 		},
 	};

 	$http(request).then(function successCallback(response) {
 		$scope.user = response.data.User;
 	}, function errorCallback(response) {
 		console.log(response);
 		if (response.statusText === "Not Found"){
 			$scope.requestError = "Veuillez vérifier votre identifiant et votre mot de passe";
 		}
 	});

 	$scope.submitChangePassword = function(isValid) {
      // check to make sure the form is completely valid
      if (isValid && $scope.user.OldPassword && ($scope.user.Password === $scope.user.ConfirmPassword)) {
      	var url = 'http://163.5.84.232/WebService/api/Account/ChangePassword';
      	var data = {
      		OldPassword: $scope.user.OldPassword,
      		NewPassword: $scope.user.Password,
    		ConfirmPassword: $scope.user.ConfirmPassword
      	};

      	console.log(data);

      	var request = {
      		method: 'POST',
      		url: url,
      		data: data,
      		headers: {
      			'Content-Type': 'application/json;charset=utf-8',
      			'Authorization': 'Bearer '+ $cookies.get("feedmetoken"),
      		}
      	};
      	$http(request).then(function successCallback(response) {
      		console.log("SUCCESS");
      		console.log(response);
      	}, function errorCallback(response) {
      		console.log(response);
      		if (response.statusText === "Not Found"){
      			$scope.requestError = "Veuillez vérifier votre identifiant et votre mot de passe";
      		}
      	});
      	}

    };
}]);