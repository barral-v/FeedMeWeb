'use strict';

/**
 * @ngdoc function
 * @name feedMeWebApp.controller:HistoryCtrl
 * @description
 * # HistoryCtrl
 * Controller of the feedMeWebApp
 */
angular.module('feedMeWebApp')
  .controller('HistoryCtrl', '$cookies', '$scope', '$location', '$http', function  ($cookies, $scope, $location, $http) {
  
        if (!$cookies.get("feedmetoken")){ 
            $location.path('/').replace(); 
        } 

  }]);
