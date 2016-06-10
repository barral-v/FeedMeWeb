'use strict';

/**
 * @ngdoc function
 * @name feedMeWebApp.controller:LoginrouteCtrl
 * @description
 * # LoginrouteCtrl
 * Controller of the feedMeWebApp
 */
 var app = angular.module('feedMeWebApp');
 
 app.controller('DetaildishCtrl', ['$timeout', '$cookies', '$scope', '$routeParams', '$http', '$location', function ($timeout, $cookies, $scope, $routeParams, $http, $location) {

 	function getRoundDate()
    {
        var coeff = 1000 * 60 * 10;
        var date = new Date();
        return new Date(Math.round(date.getTime() / coeff) * coeff);
    }

 	$scope.alerts = [];
 	if (!$cookies.get("feedmetoken")){ 
 		$location.path('/').replace(); 
 	}
 	else{

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

		    $scope.DateExpiration = getRoundDate();
			$scope.hstep = 1;
		    $scope.mstep = 10;
		    $scope.ismeridian = false;
		    $scope.dateOptions = {
			    	minDate: getRoundDate(),
			    	showWeeks: false,
			    	startingDay: 1
			    };
			$scope.priceTotal = 0;
			$scope.canCancel = false;

		    $http(request).then(function successCallback(response) {

		    	var dish = response.data;
		    	$scope.dish = dish;
		    	if (dish.Days !== null){
				    $scope.monday = dish.Days.charAt(0) === "1" ? true : false;
				    $scope.tuesday = dish.Days.charAt(1) === "1" ? true : false;
				    $scope.wednesday = dish.Days.charAt(2) === "1" ? true : false;
				    $scope.thursday = dish.Days.charAt(3) === "1" ? true : false;
				    $scope.friday = dish.Days.charAt(4) === "1" ? true : false;
				    $scope.saturday = dish.Days.charAt(5) === "1" ? true : false;
				    $scope.sunday = dish.Days.charAt(6) === "1" ? true : false;
				}
				if (dish.UserId === $cookies.get("feedmeid")){
					$scope.canCancel = true;
				}
			    $scope.dateOptions.maxDate = $scope.dish.DateExpiration;
			    $scope.image = dish.Images[0].Path;
				$scope.nbPartChange = function(){
					$scope.priceTotal = $scope.nbPart * $scope.dish.Price;
					if (!$scope.priceTotal){
						$scope.priceTotal = 0;
					}
				};
				$scope.dishCancel = function(){
			    	var url3 = 'http://163.5.84.232/WebService/api/Dishes/Cancel?id=' + $scope.dish.DishId;

				 	$http({
				 		method: 'POST',
				 		url: url3,
				 		headers: {
				            // 'Content-Type': 'multipart/form-data',
				            'Authorization': 'Bearer '+ $cookies.get("feedmetoken"),
				        }
				    }).then(function successCallback(response) {
			    			response = response;
			    			$scope.alerts.push({ type: 'success', msg: 'Your offer has been canceled' });
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

			    };

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

		    // function to submit the form after all validation has occurred            
		    $scope.submitForm = function(isValid) {

			    // check to make sure the form is completely valid
			    if (isValid) {

			    	var data = {DishId: $scope.dish.DishId,
			    		NbPart: $scope.nbPart,
			    		TotalPrice: $scope.nbPart * $scope.dish.Price,
			    		PickUpTime: $scope.DateExpiration,
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
			    			$scope.alerts.push({ type: 'success', msg: 'Your order has been submitted, it is pending validation' });
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

			};
	 	}

	}]);

