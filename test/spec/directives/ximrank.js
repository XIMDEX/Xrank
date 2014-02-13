'use strict';

describe('Directive: ximRank', function () {

  // load the directive's module
  beforeEach(module('xRankApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<xim-rank></xim-rank>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the ximRank directive');
  }));
});
