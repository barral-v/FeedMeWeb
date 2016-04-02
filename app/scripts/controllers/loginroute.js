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
        var url = 'http://163.5.84.232/WebService/api/Utilisateurs?email=';
        url += user.username  + '&password=' + user.password;
        $http({method: 'GET', url: url, headers: { 'Content-Type': 'application/x-www-form-urlencoded' }}).then(function successCallback(response) {
              console.log(response);
              $location.path('/map').replace();
            }, function errorCallback(response) {
              console.log(response);
            });
	    }

  	};
  });

