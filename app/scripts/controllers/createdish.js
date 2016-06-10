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

    function getRoundDate()
    {
        var coeff = 1000 * 60 * 10;
        var date = new Date();
        return new Date(Math.round(date.getTime() / coeff) * coeff);
    }

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

        $scope.daysError = true;
        
        $scope.dish = {
            DateExpiration: getRoundDate(),
            PickUpStartTime: getRoundDate(),
            PickUpEndTime: getRoundDate(),
            Address: {}
            };
        
        $scope.hstep = 1;
        $scope.mstep = 10;
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

        var fd = new FormData();

            //  onchange="angular.element(this).scope().uploadFile(this.files)"
        $scope.uploadFile = function(files) {
            //Take the first selected file
            fd.append("file", files[0]);
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
                    dish.Days = getDaysString();
                    dish.Address.Country = "France"

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
                        var dish = response.data;

                        var url2 = "http://163.5.84.232/WebService/api/Dishes/Images?id=" + dish.DishId;

                        var request2 = {
                          method: 'POST',
                          url: url2,
                          data: fd,
                          headers: {
                            'Content-Type': undefined,
                            'Authorization': 'Bearer '+ $cookies.get("feedmetoken"),
                            },
                          transformRequest: angular.identity
                        };                        

                        $http(request2).then(function successCallback(response) {

                        $scope.alerts.push({ type: 'success', msg: 'Your dish has been created' });
                        $timeout(function() { $location.path('/map').replace(); }, 5000);
                    });
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

