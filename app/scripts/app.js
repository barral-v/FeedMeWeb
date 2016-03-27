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
    'uiGmapgoogle-maps'
  ])
  .config(function ($routeProvider, $locationProvider, uiGmapGoogleMapApiProvider) {

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
      .when('/detaildish', {
        templateUrl: 'views/createaccount.html',
        controller: 'CreateaccountCtrl',
        controllerAs: 'createaccount'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(false).hashPrefix('*');
    // uiGmapGoogleMapApiProvider.configure({
    //     key: 'AIzaSyAI249RQPjq8yzY9r9I7z5NCYmNjMz9ssA',
    //     libraries: 'weather,geometry,visualization'
    // });
  });
