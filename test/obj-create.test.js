var should = require('should');
var fs = require('fs');
var metaDataMap = require('../meta-data/obj-create.js');

var json = JSON.parse(fs.readFileSync('test/meta-data.json'));
var data = JSON.parse(fs.readFileSync('test/test-data.json'));
var metaData = metaDataMap(json);

describe('Metadata access', function() {
  describe('Find metadata based on name', function() {
    it('should be able to find metadata for modelname1', function() {
      var sut = metaData.findMetaData('modelname1');
      sut.properties.should.be.instanceof(Array).and.have.lengthOf(2)
    });
    it('should be able to find metadata for modelname2', function() {
      var sut = metaData.findMetaData('modelname2');
      sut.properties.should.be.instanceof(Array).and.have.lengthOf(2)
    });
    it('should not be able to find metadata for foo', function() {
      try {
        metaData.findMetaData("foo");
        throw "expected exception not thrown";
      } catch(e) {
      }
    });
  });
  describe('create object based on metadata', function() {
    it('should be able to create an object based on modelname1', function() {
      var sut = metaData.create("modelname1");
      sut.should.be.instanceOf(Object);
      sut.should.have.property('property1', 'p1');
      sut.should.have.property('property2', 'p2');
    });
    it('should be able to create an object based on modelname2', function() {
      var sut = metaData.create("modelname2");
      sut.should.be.instanceOf(Object);
      sut.should.have.property('m2property1', 'm2p1');
      sut.should.have.property('m2property2', 'm2p2');
    });
    it('should not be able to create an object based on foo', function() {
      try {
        metaData.create("foo");
        throw "expected exception not thrown";
      } catch(e) {
      }
    });
  });
  describe('create object based on metadata and example', function() {
    it('should be able to create an object based on modelname1 and data', function() {
      var sut = metaData.create("modelname1", data);
      sut.should.be.instanceOf(Object);
      sut.should.have.property('property1', 'data1');
      sut.should.have.property('property2', 'data2');
    });
  });
});
