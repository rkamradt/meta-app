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
    sut = memorystore(); // create a memory store to test
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

  });
});
