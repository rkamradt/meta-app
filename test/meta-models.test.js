var should = require('should');
var fs = require('fs');
var modelsFactory = require('../meta-data/meta-models.js');

var json = JSON.parse(fs.readFileSync('test/meta-data.json'));
var data = JSON.parse(fs.readFileSync('test/test-data.json'));
var models = modelsFactory(json);

describe('models access', function() {
  describe('get model based on name', function() {
    it('should be able to find model for User', function() {
      var sut = models.getModel('User');
      sut.should.be.instanceof(Object);
      sut.getName().should.be.exactly('User');
    });
    it('should be able to find model for modelname2', function() {
      var sut = models.getModel('modelname2');
      sut.should.be.instanceof(Object);
      sut.getName().should.be.exactly('modelname2');
    });
    it('should not be able to find model for foo', function() {
      try {
        models.getModel('foo');
        throw Error('expected exception not thrown');
      } catch(e) {
        e.should.be.instanceOf(Error);
        e.message.should.be.exactly('model foo not found');
      }
    });
  });
});
