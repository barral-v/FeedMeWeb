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

    $http(request).then(function successCallback(response) {
        var data = angular.fromJson(response.data);
        var buy = data.Buy;
        var sell = data.Sell;
        $scope.sellAccept = sell.Accept;
        $scope.sellDone = sell.Done;
        $scope.sellRefuse = sell.Refuse;
        $scope.sellCancel = sell.Cancel;
        $scope.sellFinish = sell.Finish;
        $scope.buyAccept = buy.Accept;
        $scope.buyDone = buy.Done;
        $scope.buyRefuse = buy.Refuse;
        $scope.buyCancel = buy.Cancel;

    }, function errorCallback(response) {

        console.log(response);
        
        if (response.statusText == "Not Found"){
            $scope.requestError = "Veuillez vérifier votre identifiant et votre mot de passe";                
        }
        
    });

}]);
