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



    $http(request).then(function successCallback(response) {

    	$scope.dish = response.data;

    });

    $scope.hstep = 1;
    $scope.mstep = 5;
    $scope.ismeridian = false;
    $scope.dateOptions = {
    	minDate: new Date(),
    	showWeeks: true
    };

    // function to submit the form after all validation has occurred            
    $scope.submitForm = function(isValid) {

	    // check to make sure the form is completely valid
	    if (isValid) {

	    	var data = {DishId: $scope.dish.DishId,
	    		NbPart: $scope.nbPart,
	    		TotalPrice: $scope.nbPart * $scope.dish.Price,
	    		DateExpiration: $scope.dish.DateExpiration,
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

