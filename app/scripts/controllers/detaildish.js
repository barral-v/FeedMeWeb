'use strict';

/**
 * @ngdoc function
 * @name feedMeWebApp.controller:LoginrouteCtrl
 * @description
 * # LoginrouteCtrl
 * Controller of the feedMeWebApp
 */
var app = angular.module('feedMeWebApp');
 
app.controller('DetaildishCtrl', ['$cookies', '$scope', '$routeParams', '$http', function ($cookies, $scope, $routeParams, $http) {
	
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

    // function to submit the form after all validation has occurred            
  	$scope.submitForm = function(isValid) {

	    // check to make sure the form is completely valid
	    if (isValid) {
	      
	    	var data = {DishId: $scope.dish.DishId,
	    				UtilisateurIdBuyer: 1,
	    				NbPart: $scope.nbPart,
	    				TotalPrice: $scope.nbPart * $scope.dish.Price,
	    				DateExpiration: $scope.validateDate,
	    				Statut: "En cours"}

	    	$http({method: 'POST', url: url3, data: data}).then(function successCallback(response) {
	    	})

	    }

  	};
  }]);

