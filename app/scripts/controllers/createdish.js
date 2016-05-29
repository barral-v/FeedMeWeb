'use strict';

/**
 * @ngdoc function
 * @name feedMeWebApp.controller:LoginrouteCtrl
 * @description
 * # LoginrouteCtrl
 * Controller of the feedMeWebApp
 */
 var app = angular.module('feedMeWebApp');
 
 app.controller('CreatedishCtrl', ['$timeout', '$location', '$cookies', '$http', '$scope', function ($timeout, $location, $cookies, $http, $scope) {

    function getDaysString(){
        var s = "";
        s += ($scope.monday ? "1" : "0");
        s += ($scope.tuesday ? "1" : "0");
        s += ($scope.wednesday ? "1" : "0");
        s += ($scope.thursday ? "1" : "0");
        s += ($scope.friday ? "1" : "0");
        s += ($scope.saturday ? "1" : "0");
        s += ($scope.sunday ? "1" : "0");
        return s;
    }

    if (!$cookies.get("feedmetoken")){ 
        $location.path('/').replace(); 
    }
    else {

        $scope.alerts = [];

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

        // function to submit the form after all validation has occurred            
        $scope.submitCreateDish = function(isValid) {

    	    // check to make sure the form is completely valid
    	    if (isValid) {

                if (getDaysString() === "0000000"){
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
                        response = response;
                        $scope.alerts.push({ type: 'success', msg: 'Your dish has been created' });
                        $timeout(function() { $location.path('/map').replace(); }, 5000);
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
            }

        };
    }
}]);

