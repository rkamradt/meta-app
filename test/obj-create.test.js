var should = require('should');
var fs = require('fs');
var metadataMap = require('../meta-data/obj-create.js');

var json = JSON.parse(fs.readFileSync('test/meta-data.json'));
var data = JSON.parse(fs.readFileSync('test/test-data.json'));
var metadata = metadataMap(json);

describe('Metadata access', function() {
  describe('Find metadata based on name', function() {
    it('should be able to find metadata for User', function() {
      var sut = metadata.findMetadata('User');
      sut.properties.should.be.instanceof(Array).and.have.lengthOf(4);
    });
    it('should be able to find metadata for modelname2', function() {
      var sut = metadata.findMetadata('modelname2');
      sut.properties.should.be.instanceof(Array).and.have.lengthOf(2);
    });
    it('should not be able to find metadata for foo', function() {
      try {
        metadata.findMetadata('foo');
        throw Error('expected exception not thrown');
      } catch(e) {
        e.should.be.instanceOf(Error);
        e.message.should.be.exactly('model foo not found');
      }
    });
  });
  describe('create object based on metadata', function() {
    it('should be able to create an object based on User', function() {
      var sut = metadata.create('User');
      sut.should.be.instanceOf(Object);
    });
    it('should be able to create an object based on modelname2', function() {
      var sut = metadata.create('modelname2');
      sut.should.be.instanceOf(Object);
      sut.should.have.property('m2property1', 'm2p1');
      sut.should.have.property('m2property2', 'm2p2');
    });
    it('should not be able to create an object based on foo', function() {
      try {
        metadata.create('foo');
        throw Error('expected exception not thrown');
      } catch(e) {
        e.should.be.instanceOf(Error);
        e.message.should.be.exactly('model foo not found');
      }
    });
  });
  describe('create object based on metadata and example', function() {
    it('should be able to create an object based on User and data', function() {
      var sut = metadata.create('User', data);
      sut.should.be.instanceOf(Object);
      sut.should.have.property('firstName', 'Randal');
      sut.should.have.property('lastName', 'Kamradt');
    });
    it('should not be able to create an object based on modelname1 and data', function() {
      data.unknownProperty = 'bad data';
      try {
        sut = metadata.create('User', data);
        throw Error('expected exception not thrown');
      } catch(e) {
        e.should.be.instanceOf(Error);
        e.message.should.be.exactly('property unknownProperty in data not found in model');
      }
    });
  });
});
