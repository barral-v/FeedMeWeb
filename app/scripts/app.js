'use strict';

/**
 * @ngdoc overview
 * @name feedMeWebApp
 * @description
 * # feedMeWebApp
 *
 * Main module of the application.
 */
angular
  .module('feedMeWebApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngMessages',
    'ui.bootstrap',
    'uiGmapgoogle-maps',
    'angular-md5'
  ])
  .config(function ($httpProvider, $routeProvider, $locationProvider, uiGmapGoogleMapApiProvider) {

    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    delete $httpProvider.defaults.headers.common['X-Requested-With'];


    $routeProvider
      .when('/', {
        templateUrl: 'views/loginroute.html',
        controller: 'LoginrouteCtrl',
        controllerAs: 'loginroute'
      })
      .when('/createaccount', {
        templateUrl: 'views/createaccount.html',
        controller: 'CreateaccountCtrl',
        controllerAs: 'createaccount'
      })
      .when('/map', {
        templateUrl: 'views/map.html',
        controller: 'MapCtrl',
        controllerAs: 'feedmemap'
      })
      .when('/createdish', {
        templateUrl: 'views/createdish.html',
        controller: 'CreatedishCtrl',
        controllerAs: 'createdish'
      })
      .when('/detaildish/:dishId', {
        templateUrl: 'views/detaildish.html',
        controller: 'DetaildishCtrl',
        controllerAs: 'detaildish'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/detailself', {
        templateUrl: 'views/detailself.html',
        controller: 'DetailselfCtrl',
        controllerAs: 'detailself'
      })
      .when('/detailuser/:userId', {
        templateUrl: 'views/detailuser.html',
        controller: 'DetailuserCtrl',
        controllerAs: 'detailuser'
      })
      .when('/history', {
        templateUrl: 'views/history.html',
        controller: 'HistoryCtrl',
        controllerAs: 'history'
      })
      .otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(false);
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyAI249RQPjq8yzY9r9I7z5NCYmNjMz9ssA',
        libraries: 'weather,geometry,visualization'
    });
  }).value('userConnected', false).controller('HeaderCtrl', ['$rootScope', '$cookies', '$scope', function ($rootScope, $cookies, $scope) {

    $scope.logout = function(){
        if ($cookies.get("feedmetoken")){ 
            $cookies.remove("feedmetoken");
            $rootScope.userConnected = false;
        }
    }


  }]);
