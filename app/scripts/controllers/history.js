'use strict';

/**
 * @ngdoc function
 * @name feedMeWebApp.controller:HistoryCtrl
 * @description
 * # HistoryCtrl
 * Controller of the feedMeWebApp
 */
 angular.module('feedMeWebApp')
 .controller('HistoryCtrl', ['$route', '$cookies', '$scope', '$location', '$http', function  ($route, $cookies, $scope, $location, $http) {

    if (!$cookies.get("feedmetoken")){ 
        $location.path('/').replace(); 
    }

    var url = 'http://163.5.84.232/WebService/api/Historic'

    var request = {
        method: 'GET',
        url: url,
        headers: {
            'Authorization': 'Bearer '+ $cookies.get("feedmetoken"),
        }
    };

    $scope.sellList = [];
    $scope.buyList = [];
    $scope.sortType = "DateCreate";
    $scope.sortReverse = false;
    $scope.search = '';

    var createSellList = function (customlist){
        for (var i = customlist.length - 1; i >= 0; i--) {
             
             var current = customlist[i];

             $scope.sellList.push({
                OrderId: current.OrderId,
                Dish: current.Dish,
                Statut: current.Statut,
                ValidationCode: current.ValidationCode,
                DateCreate: current.DateCreate,
             });
        }
    }

    var createBuyList = function (customlist){
        for (var i = customlist.length - 1; i >= 0; i--) {
             
             var current = customlist[i];

             $scope.buyList.push({
                OrderId: current.OrderId,
                Dish: current.Dish,
                Statut: current.Statut,
                ValidationCode: current.ValidationCode,
                DateCreate: current.DateCreate,
             });
        }
    }

    $scope.cancelButton = function(model){
        var url = 'http://163.5.84.232/WebService/api/Orders/Cancel?id=';
        url += String(model.OrderId);

        var request = {
          method: 'POST',
          url: url,
          headers: {
                'Authorization': 'Bearer '+ $cookies.get("feedmetoken"),
            },
        };

        $http(request).then(function successCallback(response) {
          $route.reload();
        }, function errorCallback(response) {
          console.log(response);
        });
    }

    $scope.acceptButton = function(model){
        var url = 'http://163.5.84.232/WebService/api/Orders/Accept?id=';
        url += String(model.OrderId);

        var request = {
          method: 'POST',
          url: url,
          headers: {
                'Authorization': 'Bearer '+ $cookies.get("feedmetoken"),
            },
        };

        $http(request).then(function successCallback(response) {
          $route.reload();
        }, function errorCallback(response) {
          console.log(response);
        });
    }

    $scope.refuseButton = function(model){
        var url = 'http://163.5.84.232/WebService/api/Orders/Refuse?id=';
        url += String(model.OrderId);

        var request = {
          method: 'POST',
          url: url,
          headers: {
                'Authorization': 'Bearer '+ $cookies.get("feedmetoken"),
            },
        };

        $http(request).then(function successCallback(response) {
          $route.reload();
        }, function errorCallback(response) {
          console.log(response);
        });
    }

    $scope.doneButton = function(model){
        var url = 'http://163.5.84.232/WebService/api/Orders/Done?id=';
        url += String(model.OrderId) + "&validationCode=" + String(model.ValidationCode);

        var request = {
          method: 'POST',
          url: url,
          headers: {
                'Authorization': 'Bearer '+ $cookies.get("feedmetoken"),
            },
        };

        $http(request).then(function successCallback(response) {
          $route.reload();
        }, function errorCallback(response) {
          console.log(response);
        });
    }

    $http(request).then(function successCallback(response) {
        var str = response.data;
        var sliced = str.slice(0,-1);
        var finnished = sliced.replace(/\"/g,'"');
        var data = angular.fromJson(finnished);
        var buy = data.Buy;
        var sell = data.Sell;


        createSellList(sell["In progress"]);
        createSellList(sell["Accept"]);
        createSellList(sell["Done"]);
        createSellList(sell["Refuse"]);
        createSellList(sell["Cancel"]);
        createSellList(sell["To valid"]);


        createBuyList(buy["In progress"]);
        createBuyList(buy["Accept"]);
        createBuyList(buy["Done"]);
        createBuyList(buy["Refuse"]);
        createBuyList(buy["Cancel"]);

    }, function errorCallback(response) {

        console.log(response);
        
        if (response.statusText == "Not Found"){
            $scope.requestError = "Veuillez vérifier votre identifiant et votre mot de passe";                
        }
        
    });

}]);
