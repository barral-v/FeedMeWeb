'use strict';

describe('Controller: LoginrouteCtrl', function () {

  // load the controller's module
  beforeEach(module('feedMeWebApp'));

  var LoginrouteCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LoginrouteCtrl = $controller('LoginrouteCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(LoginrouteCtrl.awesomeThings.length).toBe(3);
  });
});
