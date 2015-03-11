var should = require('should');
var fs = require('fs');
var modelFactory = require('../meta-data/meta-model.js');

var json = JSON.parse(fs.readFileSync('test/meta-data.json'));
var data = JSON.parse(fs.readFileSync('test/test-data.json'));
var model = modelFactory(json.models[0]);

describe('property access', function() {
  describe('Get the properties of the property', function() {
    it('should be able to find the name of a property', function() {
      var sut = model.getProperty('email');
      sut.getName().should.be.exactly('email');
    });
    it('should be able to find the visiblity flag for the property', function() {
      var sut = model.getProperty('email');
      sut.isVisible().should.be.exactly(true);
    });
    it('should be able to find the key flag for the property', function() {
      var sut = model.getProperty('email');
      sut.isVisible().should.be.exactly(true);
    });
    it('should be able to find the default value for the property', function() {
      var sut = model.getProperty('email');
      should.not.exist(sut.getDefaultValue());
    });
  });
});
