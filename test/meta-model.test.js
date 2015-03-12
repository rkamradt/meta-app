var should = require('should');
var fs = require('fs');
var modelFactory = require('../meta-data/meta-model.js');

var json = JSON.parse(fs.readFileSync('test/meta-data.json'));
var data = JSON.parse(fs.readFileSync('test/test-data.json'));

describe('model access', function() {
  describe('Get the properties of the model', function() {
    it('should be able to find the name of a model', function() {
      var sut = modelFactory(json.models[0]);
      sut.getName().should.be.exactly('User');
    });
    it('should be able to find the properties for the model', function() {
      var sut = modelFactory(json.models[0]);
      sut.getProperties().should.be.instanceof(Object).and.have.property('email');
    });
    it('should be able to find the property for the model.name', function() {
      var sut = modelFactory(json.models[0]);
      sut.getProperty('firstName').getName().should.be.exactly('firstName');
    });
    it('should find the email property is key', function() {
      var sut = modelFactory(json.models[0]);
      sut.getProperty('email').isKey().should.be.exactly(true);
    });
    it('should find the name property is not key', function() {
      var sut = modelFactory(json.models[0]);
      sut.getProperty('firstName').isKey().should.be.exactly(false);
    });
    it('should not be able to find property for foo', function() {
      var sut = modelFactory(json.models[0]);
      should.not.exist(sut.getProperty('foo'));
    });
  });
  describe('create object based on model', function() {
    it('should be able to create an object based on User', function() {
      var sut = modelFactory(json.models[0]);
      var result = sut.create();
      sut.should.be.instanceOf(Object);
    });
  });
  describe('create object based on metadata and example', function() {
    it('should be able to create an object based on User and data', function() {
      var sut = modelFactory(json.models[0]);
      var result = sut.create(data[0]);
      result.should.be.instanceOf(Object);
      result.should.have.property('firstName', 'Randal');
      result.should.have.property('lastName', 'Kamradt');
    });
    it('should not be able to create an object based on modelname1 and data', function() {
      data[0].unknownProperty = 'bad data';
      try {
        var sut = modelFactory(json.models[0]);
        var result = sut.create(data[0]);
        throw Error('expected exception not thrown');
      } catch(e) {
        e.should.be.instanceOf(Error);
        e.message.should.be.exactly('property unknownProperty in data not found in model');
      }
    });
  });
});
