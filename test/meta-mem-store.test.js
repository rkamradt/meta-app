var should = require('should');
var fs = require('fs');
var metadataMap = require('../meta-data/obj-create.js');
var memorystore = require('../meta-data/mem-storage.js');

describe('Memory storage', function() {
  var json;
  var data;
  var metadata;
  var sut;
  before(function(done) {
    json = JSON.parse(fs.readFileSync('test/meta-data.json'));
    data = JSON.parse(fs.readFileSync('test/test-data.json'));
    metadata = metadataMap(json);
    done();
  });
  beforeEach(function(done) {
    sut = memorystore(metadata.findMetadata('User')); // create a memory store to test
    done();
  });
  describe('load data based from array', function() {
    it('should be able to store data from an array', function() {
      var list = [];
      list[0] = metadata.create("User", data);
      sut.load(list, function(e) {
        if(e) {
          throw e;
        }
      });
    });
    describe('find data from store', function() {
      it('should be able to find email from store', function() {
        var list = []; // copy data first
        list[0] = metadata.create("User", data);
        sut.load(list, function(e) {
          if(e) {
            throw e;
          }
        }); // then find it
        var result = sut.find('randysr@kamradtfamily.net');
        result.should.be.instanceOf(Object);
        result.should.have.property('firstName', 'Randal');
        result.should.have.property('lastName', 'Kamradt');
      });
    });

  });
});
