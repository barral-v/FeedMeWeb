'use strict';

/**
 * @ngdoc function
 * @name feedMeWebApp.controller:LoginrouteCtrl
 * @description
 * # LoginrouteCtrl
 * Controller of the feedMeWebApp
 */
 var app = angular.module('feedMeWebApp');
 
 app.controller('LoginrouteCtrl', ['$cookies', '$scope', '$location', '$http', function ($cookies, $scope, $location, $http) {
    // function to submit the form after all validation has occurred            
    $scope.submit = function(isValid) {
	    // check to make sure the form is completely valid
	    if (isValid) {
            var user = $scope.user;
            var url = 'http://163.5.84.232/WebService/Token';
            var data= {grant_type: "password",
            username: user.username, 
            password: user.password};
            var request = {
                method: 'POST',
                url: url,
                data: data,
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                    {
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    }
                    return str.join("&");
                }
            };
            $http(request).then(function successCallback(response) {
              var data = response.data;
              if (data.access_token){
                $cookies.put("feedmetoken", data.access_token);
                $location.path('/map').replace();
            }
            else{
                $scope.requestError = "Le mot de passe ou l'identifiant est invalide";
            }
            }, function errorCallback(response) {
                console.log(response);
                if (response.statusText === "Not Found")
                {
                    $scope.requestError = "Veuillez vérifier votre identifiant et votre mot de passe";
                }
                else
                {
                    $scope.requestError = response.data.error;
                }
            });
        }

    };
}]);

