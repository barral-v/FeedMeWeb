'use strict';

/**
 * @ngdoc function
 * @name feedMeWebApp.controller:HistoryCtrl
 * @description
 * # HistoryCtrl
 * Controller of the feedMeWebApp
 */
 angular.module('feedMeWebApp')
 .controller('HistoryCtrl', ['$cookies', '$scope', '$location', '$http', function  ($cookies, $scope, $location, $http) {

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

    var createSellList = function (customlist){
        for (var i = customlist.length - 1; i >= 0; i--) {
             
             var current = customlist[i];

             sellList.push({
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

             buyList.push({
                OrderId: current.OrderId,
                Dish: current.Dish,
                Statut: current.Statut,
                ValidationCode: current.ValidationCode,
                DateCreate: current.DateCreate,
             });
        }
    }

    $http(request).then(function successCallback(response) {
        var data = angular.fromJson(response.data);
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
