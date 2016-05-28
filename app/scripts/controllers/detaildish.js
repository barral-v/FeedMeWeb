'use strict';

/**
 * @ngdoc function
 * @name feedMeWebApp.controller:LoginrouteCtrl
 * @description
 * # LoginrouteCtrl
 * Controller of the feedMeWebApp
 */
 var app = angular.module('feedMeWebApp');
 
 app.controller('DetaildishCtrl', ['$cookies', '$scope', '$routeParams', '$http', '$location', function ($cookies, $scope, $routeParams, $http, $location) {

 	if (!$cookies.get("feedmetoken")){ 
 		$location.path('/').replace(); 
 	}

 	var url = 'http://163.5.84.232/WebService/api/Dishes/' + $routeParams.dishId;
 	var url2 = 'http://163.5.84.232/WebService/api/Orders';

 	var request = {
 		method: 'GET',
 		url: url,
 		headers: {
            // 'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer '+ $cookies.get("feedmetoken"),
        }
    };

    $scope.DateExpiration = new Date();
	$scope.hstep = 1;
    $scope.mstep = 5;
    $scope.ismeridian = false;
    $scope.dateOptions = {
	    	minDate: new Date(),
	    	showWeeks: false,
	    	startingDay: 1
	    };


    $http(request).then(function successCallback(response) {

    	var dish = response.data;
    	$scope.dish = dish;
	    $scope.monday = dish.Days.charAt(0) === "1" ? true : false;
	    $scope.tuesday = dish.Days.charAt(1) === "1" ? true : false;
	    $scope.wednesday = dish.Days.charAt(2) === "1" ? true : false;
	    $scope.thursday = dish.Days.charAt(3) === "1" ? true : false;
	    $scope.friday = dish.Days.charAt(4) === "1" ? true : false;
	    $scope.saturday = dish.Days.charAt(5) === "1" ? true : false;
	    $scope.sunday = dish.Days.charAt(6) === "1" ? true : false;
	    $scope.dateOptions.maxDate = $scope.dish.DateExpiration;

    });

    

    // function to submit the form after all validation has occurred            
    $scope.submitForm = function(isValid) {

	    // check to make sure the form is completely valid
	    if (isValid) {

	    	var data = {DishId: $scope.dish.DishId,
	    		NbPart: $scope.nbPart,
	    		TotalPrice: $scope.nbPart * $scope.dish.Price,
	    		DateExpiration: $scope.DateExpiration,
	    		PickUpTime: $scope.dish.DateExpiration,
	    		Statut: "In progress"};

	    		$http({
	    			method: 'POST', 
	    			url: url2, 
	    			data: data,
	    			headers: {
	    				'Content-Type': 'application/json;charset=utf-8',
	    				'Authorization': 'Bearer '+ $cookies.get("feedmetoken"),
	    			},
	    		}).then(function successCallback(response) {
	    			response = response;
	    			$location.path('/map').replace();
	    		});

	    	}

	    };
	}]);

