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

    if (!$cookies.get("feedmetoken")){ 
        $location.path('/').replace(); 
    } 

    var url = 'http://163.5.84.232/WebService/api/Dishes?page=map';

    $scope.lat = "0";
    $scope.lng = "0";
    $scope.error = "";
    $scope.windowShow = false;
    $scope.selectedCoords = {};
    $scope.selectedDish = {Name: "",
                        Price: 0,
                        NbPart: 0,
                        DishId: 0};
    $scope.listMarkers = [];


    var clickMarker = function(gmarker_instance, event_name, marker){  
      $scope.windowShow = true;
      $scope.selectedCoords = marker.coords;
      $scope.selectedDish.Name = marker.title;
      $scope.selectedDish.Price = marker.price;
      $scope.selectedDish.DishId = marker.id;
      $scope.selectedDish.NbPart = marker.nbpart;
    };

    $scope.closeClick = function(){
        $scope.windowShow = false;
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
    };

    $scope.showError = function (error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                $scope.error = "Utilisateur a refusé la Géolocalisation.";
                break;
            case error.POSITION_UNAVAILABLE:
                $scope.error = "La localisation est indisponible.";
                break;
            case error.TIMEOUT:
                $scope.error = "La requête n'a pas abouti.";
                break;
            case error.UNKNOWN_ERROR:
                $scope.error = "Erreur inconnue.";
                break;
        }
        $scope.$apply();
    };

    $scope.getLocation = function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition($scope.showPosition, $scope.showError);
        }
        else {
            $scope.error = "La géolocalisation n'est pas supportée par votre navigateur.";
        }
    };

    var request = {
        method: 'GET',
        url: url,
        headers: {
            'Authorization': 'Bearer '+ $cookies.get("feedmetoken"),
        }
    };

    

    $http(request).then(function successCallback(response) {

        var geocoder = new google.maps.Geocoder();
        var data = response.data;

        var coords = {longitude: parseFloat("0"),
                     latitude: parseFloat("0")};

        for (var i = 0; i < data.length; i++){
    
            var dish = data[i];

            if (dish.Statut == "In progress"){

                

                if (dish.Address.Latitude && dish.Address.Longitude){
                    $scope.listMarkers.push({  
                            title: dish.Name, 
                            id: dish.DishId,
                            price: dish.Price,
                            nbpart: dish.NbPart,
                            events: {click: clickMarker},
                            coords: {
                                longitude: parseFloat(dish.Address.Longitude),
                                latitude: parseFloat(dish.Address.Latitude),
                            }
                        });   
                } else{
                    var geourl = "https://maps.googleapis.com/maps/api/geocode/json?address="
                    geourl += encodeURIComponent(dish.Address.Road) + "&key=AIzaSyAI249RQPjq8yzY9r9I7z5NCYmNjMz9ssA"

                    $http.get(geourl).success((function(dish) {
                        return function(data) {
                            var results = data.results;
                            $scope.listMarkers.push({  
                                title: dish.Name, 
                                id: dish.DishId,
                                price: dish.Price,
                                nbpart: dish.NbPart,
                                events: {click: clickMarker},
                                coords: {
                                    longitude: parseFloat(results[0].geometry.location.lng),
                                    latitude: parseFloat(results[0].geometry.location.lat),
                                }
                            });
                        }
                    })(dish));
                }
            }
        }
    
    $scope.getLocation();
    
    }, function errorCallback(response) {

            console.log(response);
        
            if (response.statusText == "Not Found"){
                $scope.requestError = "Veuillez vérifier votre identifiant et votre mot de passe";                
            }
        
        });
  }]);
