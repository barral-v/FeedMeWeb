'use strict';

/**
 * @ngdoc function
 * @name feedMeWebApp.controller:LoginrouteCtrl
 * @description
 * # LoginrouteCtrl
 * Controller of the feedMeWebApp
 */
var app = angular.module('feedMeWebApp');
 

app.controller('MapCtrl', ['$rootScope', '$scope', '$location', '$http', function  ($rootScope, $scope, $http, $location) {

    var url = 'http://163.5.84.232/WebService/api/Dishes';
    var url2 = 'http://163.5.84.232/WebService/api/Adresses/';

    $scope.lat = "0";
    $scope.lng = "0";
    $scope.error = "";

    var clickMarker = function(gmarker_instance, event_name, marker){
      $location.path('/detaildish/' + marker.id).replace();
    };

    $scope.showPosition = function (position) {
        $scope.lat = position.coords.latitude;
        $scope.lng = position.coords.longitude;
        $scope.map = {  center:{latitude: position.coords.latitude, 
                                longitude: position.coords.longitude}, 
                        zoom: 14,
                        options: {zoomControl: false,
                                  streetViewControl: false,
                                  disableDoubleClickZoom: true,
                                  mapTypeControl: false}
                    };
        $scope.$apply();
    }

    $scope.showError = function (error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                $scope.error = "Utilisateur a refusé la Géolocalisation."
                break;
            case error.POSITION_UNAVAILABLE:
                $scope.error = "La localisation est indisponible."
                break;
            case error.TIMEOUT:
                $scope.error = "La requête n'a pas abouti."
                break;
            case error.UNKNOWN_ERROR:
                $scope.error = "Erreur inconnue."
                break;
        }
        $scope.$apply();
    }

    $scope.getLocation = function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition($scope.showPosition, $scope.showError);
        }
        else {
            $scope.error = "La géolocalisation n'est pas supportée par votre navigateur.";
        }
    }

    $http({method: 'GET', url: url}).then(function successCallback(response) {

        var data = response.data;

        $scope.listMarkers = []

        for (var i = 0; i < data.length; i++){

            $scope.data = data[i];

            $http({method: 'GET', url: url2 + data[i].AdressId}).then(function successCallback(response) {
                
                var marker = {  latitude: parseFloat(response.data.Latitude),
                                longitude: parseFloat(response.data.Longitude),
                                title: $scope.data.Name, 
                                'id': $scope.data.DishId, 
                                'events': {click: clickMarker}, 
                                'options': {labelClass: 'maplabel', 
                                            labelAnchor:'12 60', 
                                            'labelContent': $scope.data.Name}
                             }

                $scope.listMarkers.push(marker)
            })
        }

        $scope.getLocation();
    
    }, function errorCallback(response) {

            console.log(response);
        
            if (response.statusText == "Not Found"){
                $scope.requestError = "Veuillez vérifier votre identifiant et votre mot de passe"                
            }
        
        });
  }]);
