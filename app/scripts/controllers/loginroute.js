'use strict';

/**
 * @ngdoc function
 * @name feedMeWebApp.controller:LoginrouteCtrl
 * @description
 * # LoginrouteCtrl
 * Controller of the feedMeWebApp
 */
var app = angular.module('feedMeWebApp');
 
app.controller('LoginrouteCtrl', function ($scope, $location, $http) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    // function to submit the form after all validation has occurred            
  	$scope.submit = function(isValid) {
	    // check to make sure the form is completely valid
	    if (isValid) {
        var user = $scope.user;
        if (user.username == "admin" && user.password == "admin"){
          $location.path('/map').replace();
        }
	    }

  	};
  });

