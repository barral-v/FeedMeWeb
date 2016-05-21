'use strict';

/**
 * @ngdoc function
 * @name feedMeWebApp.controller:CreateaccountCtrl
 * @description
 * # CreateaccountCtrl
 * Controller of the feedMeWebApp
 */
var app = angular.module('feedMeWebApp');
 
app.controller('CreateaccountCtrl', ['$cookies', '$scope', '$location', '$http', function ($cookies, $scope, $location, $http) {
    // function to submit the form after all validation has occurred            
  	$scope.submitCreateAccount = function(isValid) {
      // check to make sure the form is completely valid
      if (isValid && ($scope.user.Password == $scope.user.ConfirmPassword)) {
		    var user = $scope.user;
            var url = 'http://163.5.84.232/WebService/api/Account/Register';

            var request = {
              method: 'POST',
              url: url,
              data: user,
              headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
            }

            $http(request).then(function successCallback(response) {
                $location.path('/').replace();
        }, function errorCallback(response) {
            console.log(response);
            if (response.statusText == "Not Found"){
                $scope.requestError = "Veuillez vérifier votre identifiant et votre mot de passe"                
            }
        });
      }

  	};
  }]);

