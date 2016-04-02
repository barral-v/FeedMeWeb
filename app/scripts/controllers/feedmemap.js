'use strict';

/**
 * @ngdoc function
 * @name feedMeWebApp.controller:LoginrouteCtrl
 * @description
 * # LoginrouteCtrl
 * Controller of the feedMeWebApp
 */
var app = angular.module('feedMeWebApp');
 

app.controller('MapCtrl', function ($scope, $http, $location) {

    var clickMarker = function(){
      $location.path('/').replace();
    };

    $scope.map = { center: { latitude: 48.831451, longitude: 2.3203403 }, zoom: 14, options: {scrollwheel: false, zoomControl: false, streetViewControl: false, disableDoubleClickZoom: true, mapTypeControl: false}};
    $scope.initMap = function () {
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 8
        });
      };
    $scope.listMarkers = [
      {latitude: 48.8307635, longitude: 2.3206993, title: "M1", 'icon': ' http://icons.iconarchive.com/icons/fatcow/farm-fresh/32/rainbow-icon.png', 'id': 1, 'events': {click: clickMarker}, 'options': {labelClass: 'maplabel', labelAnchor:'12 60', 'labelContent': "MARKER 1"}},
      {latitude: 48.8310, longitude: 2.32030, title: "M2", 'icon': ' http://icons.iconarchive.com/icons/fatcow/farm-fresh/32/rainbow-icon.png', 'id': 2, 'events': {click: clickMarker}, 'options': {labelClass: 'maplabel', labelAnchor:'12 60', 'labelContent': "MARKER 2"}}
    ];
  });
