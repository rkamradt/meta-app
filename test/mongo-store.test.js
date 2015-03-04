var should = require('should');
var fs = require('fs');
var metadataMap = require('../meta-data/meta-create.js');
var mongostore = require('../meta-data/mongo-storage.js');
var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/myproject';

var loadFromData = function(metadata, data, sut, done) {
  var list = [];
  for(var d in data) {
    list.push(metadata.create('User', data[d]));
  }
  sut.load(list, done);
};

describe('Mongo storage', function() {
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
    MongoClient.connect(url, function(err, db) {
      if(err) {
        done(err);
        return;
      }
      var collection = db.collection('documents');
      collection.drop(function(err, result) {
        if(err) {
          console.log("drop: " + err);
        }
        collection = db.collection('documents');
        db.close();
        done();
      });
    });
  });
  describe('load data based from array', function() {
    it('should be able to store data from an array', function(done) {
      var sut = mongostore(metadata.findMetadata('User'),testFileName); // create a file store to test
      var list = loadFromData(metadata, data, sut, function(err) {
        should.not.exist(err);
        sut.findAll(function(err, result) {
          should.not.exist(err);
          result.should.be.instanceOf(Array).and.be.length(2);
          done();
        });
      });
    });
    describe('add data to store', function() {
      it('should be able to add to store', function(done) {
        var sut = mongostore(metadata.findMetadata('User'),testFileName); // create a file store to test
        var newObj = metadata.create("User");
        newObj.email='test@test.com';
        newObj.firstName='Test';
        newObj.lastName='McTest';
        sut.add(newObj, function(err, result) {
          should.not.exist(err);
          result.should.be.exactly(1);
          sut.find('test@test.com', function(err, result) {
            should.not.exist(err);
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
        var sut = mongostore(metadata.findMetadata('User'),testFileName); // create a file store to test
        loadFromData(metadata, data, sut, function(err) {
          should.not.exist(err);
          sut.find('randysr@kamradtfamily.net', function(err, result) {
            should.not.exist(err);
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
        var sut = mongostore(metadata.findMetadata('User'),testFileName); // create a file store to test
        loadFromData(metadata, data, sut, function(err) {
          should.not.exist(err);
          sut.findAll(function(err, result) {
            should.not.exist(err);
            result.should.be.instanceOf(Array).and.be.length(2);
            done();
          });
        });
      });
    });
    describe('remove data from store', function() {
      it('should be able to remove data from store', function(done) {
        var sut = mongostore(metadata.findMetadata('User'),testFileName); // create a file store to test
        loadFromData(metadata, data, sut, function(err) {
          should.not.exist(err);
          sut.remove('randysr@kamradtfamily.net', function(err, result) {
            should.not.exist(err);
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
        var sut = mongostore(metadata.findMetadata('User'),testFileName); // create a file store to test
        loadFromData(metadata, data, sut, function(err) {
          should.not.exist(err);
          sut.remove('bad@bad.com', function(err, result) {
            should.not.exist(err);
            should.not.exist(result);
            sut.findAll(function(err, result) {
              should.not.exist(err);
              result.should.be.instanceOf(Array).and.be.length(2);
              done();
            });
          });
        });
      });
    });
  });
});
