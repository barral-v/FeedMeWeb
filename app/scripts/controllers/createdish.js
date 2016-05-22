'use strict';

/**
 * @ngdoc function
 * @name feedMeWebApp.controller:LoginrouteCtrl
 * @description
 * # LoginrouteCtrl
 * Controller of the feedMeWebApp
 */
var app = angular.module('feedMeWebApp');
 
app.controller('CreatedishCtrl', ['$location', '$cookies', '$http', '$scope', function ($location, $cookies, $http, $scope) {

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

    $scope.dish = {DateExpiration: new Date(),
                   PickUpStartTime: new Date(),
                    PickUpEndTime: new Date()};
    $scope.hstep = 1;
    $scope.mstep = 5;
    $scope.ismeridian = false;
    $scope.dateOptions = {
        minDate: new Date(),
        showWeeks: true
      };

    // function to submit the form after all validation has occurred            
  	$scope.submitCreateDish = function(isValid) {

	    // check to make sure the form is completely valid
	    if (isValid) {

	      	var dish = $scope.dish;

	      	$scope.getDishLocation();

            dish.Address = {
                Latitude: $scope.lat,
                Longitude: $scope.lng,
            }
            dish.Status = "In progress";
        	
        	var url = 'http://163.5.84.232/WebService/api/Dishes';

        	var request = {
              method: 'POST',
              url: url,
              data: dish,
              headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': 'Bearer '+ $cookies.get("feedmetoken"),
              },
            }

            $http(request).then(function successCallback(response) {
                $location.path('/map').replace();
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

