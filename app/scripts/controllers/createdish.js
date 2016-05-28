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

    if (!$cookies.get("feedmetoken")){ 
        $location.path('/').replace(); 
    }

    $scope.showDishPosition = function (position) {
        $scope.lat = position.coords.latitude;
        $scope.lng = position.coords.longitude;
        $scope.$apply();
    };

    $scope.getDishLocation = function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition($scope.showDishPosition, $scope.showError);
        }
        else {
            $scope.error = "La géolocalisation n'est pas supportée par votre navigateur.";
        }
    };

    $scope.daysError = true;
    
    $scope.dish = {
        DateExpiration: new Date(),
        PickUpStartTime: new Date(),
        PickUpEndTime: new Date()
        };
    
    $scope.hstep = 1;
    $scope.mstep = 5;
    $scope.monday = false;
    $scope.tuesday = false;
    $scope.wednesday = false;
    $scope.thursday = false;
    $scope.friday = false;
    $scope.saturday = false;
    $scope.sunday = false;
    $scope.ismeridian = false;
    $scope.daysError = false;
    
    $scope.dateOptions = {
            minDate: new Date(),
            showWeeks: false,
            startingDay: 1
        };

    function getDaysString(){
        var s = ""
        s += ($scope.monday ? "1" : "0");
        s += ($scope.tuesday ? "1" : "0");
        s += ($scope.wednesday ? "1" : "0");
        s += ($scope.thursday ? "1" : "0");
        s += ($scope.friday ? "1" : "0");
        s += ($scope.saturday ? "1" : "0");
        s += ($scope.sunday ? "1" : "0");
        return s;
    };

    // function to submit the form after all validation has occurred            
    $scope.submitCreateDish = function(isValid) {

	    // check to make sure the form is completely valid
	    if (isValid) {

            if (getDaysString() == "0000000"){
                $scope.daysError = true;
            }
            else{
                var dish = $scope.dish;

                $scope.getDishLocation();

                dish.Address.Latitude = $scope.lat;
                dish.Address.Longitude = $scope.lng;
                dish.Days = getDaysString();

                var url = 'http://163.5.84.232/WebService/api/Dishes';

                var request = {
                  method: 'POST',
                  url: url,
                  data: dish,
                  headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Authorization': 'Bearer '+ $cookies.get("feedmetoken"),
                    },
                };

                $http(request).then(function successCallback(response) {
                    $location.path('/map').replace();
                }, function errorCallback(response) {
                    console.log(response);
                    if (response.statusText === "Not Found"){
                        $scope.requestError = "Veuillez vérifier votre identifiant et votre mot de passe";
                    }
                    else{
                        $scope.requestError = response.data.error;
                    }
                });
            }
    }

};
}]);

