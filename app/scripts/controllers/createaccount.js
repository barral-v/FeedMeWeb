'use strict';

/**
 * @ngdoc function
 * @name feedMeWebApp.controller:CreateaccountCtrl
 * @description
 * # CreateaccountCtrl
 * Controller of the feedMeWebApp
 */
var app = angular.module('feedMeWebApp');
 
app.controller('CreateaccountCtrl', ['$rootScope', '$scope', '$location', '$http', function ($rootScope, $scope, $location, $http) {
    // function to submit the form after all validation has occurred            
  	$scope.submitCreateAccount = function(isValid) {
      // check to make sure the form is completely valid
      if (isValid && ($scope.user.Password == $scope.passwordvalidator)) {
		    var user = $scope.user;
            var url = 'http://163.5.84.232/WebService/api/Account/Register';

            var request = {
              method: 'POST',
              url: url,
              data: user,
              transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                }
            }

            $http(request).then(function successCallback(response) {
              console.log(response);
              var data = response.data;
              if (data.access_token){
                $rootScope.oauth = {access_token: data.access_token}
                $location.path('/map').replace();
            }
            else{
                $scope.requestError = response.statusText
            }
        }, function errorCallback(response) {
            console.log(response);
            if (response.statusText == "Not Found"){
                $scope.requestError = "Veuillez vérifier votre identifiant et votre mot de passe"                
            }
        });
      }

  	};
  }]);

