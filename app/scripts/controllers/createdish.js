'use strict';

/**
 * @ngdoc function
 * @name feedMeWebApp.controller:LoginrouteCtrl
 * @description
 * # LoginrouteCtrl
 * Controller of the feedMeWebApp
 */
var app = angular.module('feedMeWebApp');
 
app.controller('CreatedishCtrl', function ($scope) {
    // function to submit the form after all validation has occurred            
  	$scope.submitCreateDish = function(isValid) {

	    // check to make sure the form is completely valid
	    if (isValid) {
	      alert('our form is amazing');
	    }

  	};
  });

