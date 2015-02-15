var should = require('should');
var fs = require('fs');
var objCreator = require('../meta-data/obj-create.js');

var json = JSON.parse(fs.readFileSync('meta-data/meta-data.json'));
var data = JSON.parse(fs.readFileSync('test/test-data.json'));

describe('Object creation', function() {
  describe('create object based on meta-data', function() {
    it('should be able to create an object based on meta-data', function() {
      var sut = objCreator()(json);
      sut.should.be.instanceOf(Object);
    });
  });
});
