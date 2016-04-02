'use strict';

/**
 * @ngdoc function
 * @name feedMeWebApp.controller:LoginrouteCtrl
 * @description
 * # LoginrouteCtrl
 * Controller of the feedMeWebApp
 */
var app = angular.module('feedMeWebApp');
 
app.controller('MapCtrl', ['$scope', '$http', function ($scope, $http) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.map = { center: { latitude: 48.831451, longitude: 2.3203403 }, zoom: 15 };
    $scope.initMap = function () {
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 8
        });
      }
    $scope.listMarkers = [
      {latitude: 48.8307635, longitude: 2.3206993, title: "M1", 'id': 1, 'options': {labelAnchor:'12 60', 'labelContent': "MARKER 1"}},
      {latitude: 48.8310, longitude: 2.32030, title: "M2", 'id': 2, 'options': {labelAnchor:'12 60', 'labelContent': "MARKER 2"}}
    ];
  }]);
