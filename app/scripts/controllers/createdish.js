'use strict';

/**
 * @ngdoc function
 * @name feedMeWebApp.controller:LoginrouteCtrl
 * @description
 * # LoginrouteCtrl
 * Controller of the feedMeWebApp
 */
var app = angular.module('feedMeWebApp');
 
app.controller('CreatedishCtrl', ['$cookies', '$scope', function ($cookies, $scope) {

	$scope.showDishPosition = function (position) {
        $scope.lat = position.coords.latitude;
        $scope.lng = position.coords.longitude;
        $scope.$apply();
    }

  	$scope.getDishLocation = function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition($scope.showDishPosition, $scope.showError);
        }
        else {
            $scope.error = "La géolocalisation n'est pas supportée par votre navigateur.";
        }
    }

    // function to submit the form after all validation has occurred            
  	$scope.submitCreateDish = function(isValid) {

	    // check to make sure the form is completely valid
	    if (isValid) {

	      	var dish = $scope.dish;

            dish.Address = {
                Latitude: $scope.lat,
                Longitude: $scope.lng,
            }

	      	$scope.getDishLocation();
        	
        	var url = 'http://163.5.84.232/WebService/api/Dishes';

        	var request = {
              method: 'POST',
              url: url,
              data: dish,
              headers: {
                'Authorization': 'Bearer '+ $cookies.get("feedmetoken"),
              },
              transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                }
            }

            $http(request).then(function successCallback(response) {
              var data = response.data;
              if (data.access_token){
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
                else{
                    $scope.requestError = response.data.error
                }
            });
	    }

  	};
  }]);

