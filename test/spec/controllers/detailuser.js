'use strict';

describe('Controller: DetailuserCtrl', function () {

  // load the controller's module
  beforeEach(module('feedMeWebApp'));

  var DetailuserCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DetailuserCtrl = $controller('DetailuserCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(DetailuserCtrl.awesomeThings.length).toBe(3);
  });
});
