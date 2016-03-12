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
    'ngMessages'
  ])
  .config(function ($routeProvider) {
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
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
