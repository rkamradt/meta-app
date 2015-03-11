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
  describe('create object based on model', function() {
    it('should be able to create an object based on User', function() {
      var sut = models.create('User');
      sut.should.be.instanceOf(Object);
    });
    it('should be able to create an object based on modelname2', function() {
      var sut = models.create('modelname2');
      sut.should.be.instanceOf(Object);
      sut.should.have.property('m2property1', 'm2p1');
      sut.should.have.property('m2property2', 'm2p2');
    });
    it('should not be able to create an object based on foo', function() {
      try {
        models.create('foo');
        throw Error('expected exception not thrown');
      } catch(e) {
        e.should.be.instanceOf(Error);
        e.message.should.be.exactly('model foo not found');
      }
    });
  });
  describe('create object based on models and example', function() {
    it('should be able to create an object based on User and data', function() {
      var sut = models.create('User', data[0]);
      sut.should.be.instanceOf(Object);
      sut.should.have.property('firstName', 'Randal');
      sut.should.have.property('lastName', 'Kamradt');
    });
    it('should not be able to create an object based on modelname1 and data', function() {
      data[0].unknownProperty = 'bad data';
      try {
        sut = models.create('User', data[0]);
        throw Error('expected exception not thrown');
      } catch(e) {
        e.should.be.instanceOf(Error);
        e.message.should.be.exactly('property unknownProperty in data not found in model');
      }
    });
  });
});
