'use strict';

/**
 * @ngdoc function
 * @name feedMeWebApp.controller:LoginrouteCtrl
 * @description
 * # LoginrouteCtrl
 * Controller of the feedMeWebApp
 */
var app = angular.module('feedMeWebApp');
 

app.controller('MapCtrl', ['$cookies', '$scope', '$location', '$http', function  ($cookies, $scope, $location, $http) {

    var url = 'http://163.5.84.232/WebService/api/Dishes?page=map';

    $scope.lat = "0";
    $scope.lng = "0";
    $scope.error = "";
    $scope.windowShow = false;
    $scope.selectedCoords = {};
    $scope.selectedDish = {};


    var clickMarker = function(gmarker_instance, event_name, marker){  
      $scope.windowShow = true;
      $scope.selectedCoords = marker.coords;
      $scope.selectedDish = marker.dish;
    };

    $scope.closeClick = function(){
        $scope.windowShow = false;
    }

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

    var request = {
        method: 'GET',
        url: url,
        headers: {
            // 'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer '+ $cookies.get("feedmetoken"),
        }
    };

    $http(request).then(function successCallback(response) {

        var geocoder = new google.maps.Geocoder();
        var data = response.data;

        $scope.listMarkers = [];

        for (var i = 0; i < data.length; i++){
    
            var dish = data[i];

            console.log(dish);

            if (dish.Statut = "In progress"){

                var marker = {  
                                title: dish.Name, 
                                'id': dish.DishId,
                                'events': {click: clickMarker},
                                'options': {labelClass: 'maplabel', 
                                            labelAnchor:'12 60', 
                                            'labelContent': dish.Name
                                        },
                                'dish': dish,
                            }

                if (dish.Latitude && dish.Longitude){
                    marker.coords = {longitude: parseFloat(response.data.Longitude),
                                    latitude: parseFloat(response.data.Latitude)}   
                    $scope.listMarkers.push(marker);
                }
                else if (dish.Address.Road) {
                    // Initialize the Geocoder
                    
                    if (geocoder){
                        var address = dish.Address.Road;
                        geocoder.geocode({
                            'address': address
                        }, function (results, status) {
                            if (status == google.maps.GeocoderStatus.OK) {
                                marker.coords = {longitude: parseFloat(results[0].geometry.location.lng()),
                                                latitude: parseFloat(results[0].geometry.location.lat())}    
                                $scope.listMarkers.push(marker)
                            }
                        });
                    }
                }            

            }

        }

        angular.forEach($scope.listMarker, function(value, key) {
            value.onClick = function(){
                $scope.onClick(value.data);
                $scope.MapOptions.markers.selected = value;
            };
        });

        $scope.getLocation();
    
    }, function errorCallback(response) {

            console.log(response);
        
            if (response.statusText == "Not Found"){
                $scope.requestError = "Veuillez vérifier votre identifiant et votre mot de passe"                
            }
        
        });
  }]);
