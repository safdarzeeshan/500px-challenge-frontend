'use strict';

describe('Service: photos', function () {

  // load the service's module
  beforeEach(module('500pxChallengeApp'));

  // instantiate service
  var photos;
  beforeEach(inject(function (_photos_) {
    photos = _photos_;
  }));

  it('should do something', function () {
    expect(!!photos).toBe(true);
  });

});
