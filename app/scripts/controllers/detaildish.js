'use strict';

/**
 * @ngdoc function
 * @name feedMeWebApp.controller:LoginrouteCtrl
 * @description
 * # LoginrouteCtrl
 * Controller of the feedMeWebApp
 */
var app = angular.module('feedMeWebApp');
 
app.controller('DetaildishCtrl', ['$scope', '$routeParams', function ($scope, $routeParams) {
	$scope.dishId = $routeParams.dishId;
	$scope.dish = {
		name: "Tarte légère courgettes, jambon et chèvre gratiné",
		image: 'http://images.marmitoncdn.org/recipephotos/multiphoto/26/2625ea3f-1cb1-4488-8d6e-fc4b9d0188a3_normal.jpg',
		price: 6,
		description: "Excellent recette de tarte, parfaite pour toute vos soirées entre amis",
		nbPart: 500,
		sizePart: 200,
		utilisateurId: 1,
		status: "En cours",
		dateExpiration: "2080-01-01",
	}
    // function to submit the form after all validation has occurred            
  	$scope.submitForm = function(isValid) {

	    // check to make sure the form is completely valid
	    if (isValid) {
	      alert('our form is amazing');
	    }

  	};
  }]);

