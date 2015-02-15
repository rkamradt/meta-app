var should = require('should');
var fs = require('fs');
var objCreator = require('../meta-data/obj-create.js');

var json = JSON.parse(fs.readFileSync('test/meta-data.json'));
var data = JSON.parse(fs.readFileSync('test/test-data.json'));

describe('Object creation', function() {
  describe('create object based on meta-data', function() {
    it('should be able to create an object based on modelname1', function() {
      var sut = objCreator(json)("modelname1");
      sut.should.be.instanceOf(Object);
      sut.should.have.property('property1', 'p1');
      sut.should.have.property('property2', 'p2');
    });
    it('should be able to create an object based on modelname2', function() {
      var sut = objCreator(json)("modelname2");
      sut.should.be.instanceOf(Object);
      sut.should.have.property('m2property1', 'm2p1');
      sut.should.have.property('m2property2', 'm2p2');
    });
    it('should not be able to create an object based on foo', function() {
      try {
        objCreator(json)("foo");
      } catch(e) {
      }
    });
  });
});
