var should = require('should');
var fs = require('fs');
var metadataMap = require('../meta-data/obj-create.js');
var filestore = require('../meta-data/file-storage.js');

var loadFromData = function(metadata, data, sut, done) {
  var list = [];
  for(var d in data) {
    var len = list.push(metadata.create("User", data[d]));
  }
  sut.load(list, done);
};

describe('File storage', function() {
  var json;
  var data;
  var metadata;
  var testFileName = 'testfile.json';
  before(function(done) {
    json = JSON.parse(fs.readFileSync('test/meta-data.json'));
    data = JSON.parse(fs.readFileSync('test/test-data.json'));
    metadata = metadataMap(json);
    done();
  });
  beforeEach(function(done) {
    console.log('beforeEach called');
    if(fs.existsSync(testFileName)) {
      fs.unlinkSync(testFileName);
    }
    done();
  });
  describe('load data based from array', function() {
    it('should be able to store data from an array', function(done) {
      var sut = filestore(metadata.findMetadata('User'),testFileName); // create a file store to test
      var list = loadFromData(metadata, data, sut, function(err, result) {
        sut.findAll(function(err, result) {
          result.should.be.instanceOf(Array).and.be.length(2);
          done();
        });
      });
    });
    describe('add data to store', function() {
      it('should be able to add to store', function(done) {
        var sut = filestore(metadata.findMetadata('User'),testFileName); // create a file store to test
        var newObj = metadata.create("User");
        newObj.email='test@test.com';
        newObj.firstName='Test';
        newObj.lastName='McTest';
        sut.add(newObj, function(err, result) {
          result.should.be.exactly(1);
          sut.find('test@test.com', function(err, result) {
            result.should.be.instanceOf(Object);
            result.should.have.property('firstName', newObj.firstName);
            result.should.have.property('lastName', newObj.lastName);
            done();
          });
        });
      });
    });
    describe('find data from store', function() {
      it('should be able to find email from store', function(done) {
        var sut = filestore(metadata.findMetadata('User'),testFileName); // create a file store to test
        var list = loadFromData(metadata, data, sut, function(err, result) {
          sut.find('randysr@kamradtfamily.net', function(err, result) {
            result.should.be.instanceOf(Object);
            result.should.have.property('firstName', 'Randal');
            result.should.have.property('lastName', 'Kamradt');
            done();
          });
        });
      });
    });
    describe('retrieve all data from store', function() {
      it('should be able to retrieve all data from store', function(done) {
        var sut = filestore(metadata.findMetadata('User'),testFileName); // create a file store to test
        var list = loadFromData(metadata, data, sut, function(err, result) {
          sut.findAll(function(err, result) {
            result.should.be.instanceOf(Array).and.be.length(2);
            done();
          });
        });
      });
    });
    describe('remove data from store', function() {
      it('should be able to remove data from store', function(done) {
        var sut = filestore(metadata.findMetadata('User'),testFileName); // create a file store to test
        var list = loadFromData(metadata, data, sut, function(err, result) {
          sut.remove('randysr@kamradtfamily.net', function(err, result) {
            result.should.be.instanceOf(Object);
            result.should.have.property('firstName', 'Randal');
            result.should.have.property('lastName', 'Kamradt');
            sut.findAll(function(err, result) {
              result.should.be.instanceOf(Array).and.be.length(1);
              done();
            });
          });
        });
      });
      it('should return null if data to be removed doesnt exist', function(done) {
        var sut = filestore(metadata.findMetadata('User'),testFileName); // create a file store to test
        var list = loadFromData(metadata, data, sut, function(err, result) {
          sut.remove('bad@bad.com', function(err, result) {
            should.not.exist(result);
            sut.findAll(function(err, result) {
              result.should.be.instanceOf(Array).and.be.length(2);
              done();
            });
          });
        });
      });
    });
  });
});
