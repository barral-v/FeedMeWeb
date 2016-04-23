'use strict';

/**
 * @ngdoc function
 * @name feedMeWebApp.controller:LoginrouteCtrl
 * @description
 * # LoginrouteCtrl
 * Controller of the feedMeWebApp
 */
 var app = angular.module('feedMeWebApp');
 
 app.controller('LoginrouteCtrl', function ($scope, $location, $http) {
    // function to submit the form after all validation has occurred            
    $scope.submit = function(isValid) {
	    // check to make sure the form is completely valid
	    if (isValid) {
            var user = $scope.user;
            var url = 'http://163.5.84.232/WebService/api/Utilisateurs?email=';
            url += user.username  + '&password=' + user.password;
            $http({method: 'POST', url: url}).then(function successCallback(response) {
              console.log(response);
              var data = response.data;
              if (data.Firstname){
                $location.path('/map').replace();
            }
            else{
                $scope.requestError = "Le mot de passe ou l'identifiant est invalide"
            }
        }, function errorCallback(response) {
            console.log(response);
            if (response.statusText == "Not Found"){
                $scope.requestError = "Veuillez vérifier votre identifiant et votre mot de passe"                
            }
        });
        }

    };
});

