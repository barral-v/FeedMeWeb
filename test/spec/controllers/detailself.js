'use strict';

describe('Controller: DetailselfCtrl', function () {

  // load the controller's module
  beforeEach(module('feedMeWebApp'));

  var DetailselfCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DetailselfCtrl = $controller('DetailselfCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(DetailselfCtrl.awesomeThings.length).toBe(3);
  });
});
