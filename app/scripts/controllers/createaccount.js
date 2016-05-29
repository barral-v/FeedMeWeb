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
      if ($scope.user.Password !== $scope.user.ConfirmPassword){
        $scope.errorMessage = "The password and confirmation password do not match.";
      }
      else if (isValid) {
        var user = $scope.user;
        var url = 'http://163.5.84.232/WebService/api/Account/Register';

        var request = {
          method: 'POST',
          url: url,
          data: user,
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
        };

        $http(request).then(function successCallback(response) {
          $location.path('/').replace();
          response = response;
        }, function errorCallback(response) {
          var message = response.data.Message;
          if (message !== "The request is invalid."){
            $scope.errorMessage = message;
          }
          else{
            var modelState = response.data.ModelState;
            var error_list = "";
            for (var key in modelState) {
              if (modelState.hasOwnProperty(key)) {
                for (var i = modelState[key].length - 1; i >= 0; i--) {
                    error_list += modelState[key][i];
                    error_list += "\n";
                }
              }
            }
            $scope.errorMessage = error_list;
          }
        });
      }

    };
  }]);

