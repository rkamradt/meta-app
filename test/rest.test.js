var should = require('should');
var fs = require('fs');
var rest = require('../meta-data/meta-api-rest');
var reqCreate = require('./req-create.js')();
var resCreate = require('./res-create.js')();
var objCreate = require('../meta-data/obj-create.js')();

var json = JSON.parse(fs.readFileSync('test/meta-data.json'));

var test = JSON.parse(fs.readFileSync('test/test-data.json'));
// REST methods:
// GET returns a list with optional filters
// GET :id returns a single document
// POST :id {doc} updates a single document
// PUT {doc} adds a single document
// DELETE :id deletes a single document

var MongoClient = require('mongodb').MongoClient;

// Connection URL
var url = 'mongodb://localhost:27017/myproject';

describe('Rest API', function(){
  var self = this;
  beforeEach(function(done) {
    // Use connect method to connect to the Server
    MongoClient.connect(url, function(err, db) {
      if(err) return done(err);
      console.log("Connected correctly to server");
      var collection = db.collection('documents');
      collection.drop(function(err, result) {
        if(err) return done(err);
        collection = db.collection('documents');
        collection.insert(test[0].data, function(err, result) {
          if(err) return done(err);
          console.log("Inserted 2 documents into the document collection");
          db.close();
          done();
        });
      });
    });
  });
  afterEach(function(done) {
    done(); // when we use a database, all of this will need to be asynchronous
  });
  describe('modelname1', function(){
    it('should be able to return modelname1 with /modelname1' , function(){
        var sut = rest(json);
        var endvalue = '';
        var req = reqCreate('/modelname1', '', 'GET');
        var res = resCreate();
        sut(req, res, function next() {
          throw "next should not be called";
        });
        res.message().should.equal('looking at model modelname1');
    });
    it('should be able to return modelname2 with /modelname2' , function(){
        var sut = rest(json);
        var endvalue = '';
        var req = reqCreate('/modelname2', '', 'GET');
        var res = resCreate();
        sut(req, res, function next() {
          throw "next should not be called";
        });
        res.message().should.equal('looking at model modelname2');
    });
    it('should return model not found with path /foo' , function(){
        var sut = rest(json);
        var endvalue = '';
        var req = reqCreate('/foo', '', 'GET');
        var res = resCreate();
        sut(req, res, function next() {
          throw "next should not be called";
        });
        res.message().should.equal('model not found');
    });
    it('should return model not found with path /' , function(){
        var sut = rest(json);
        var endvalue = '';
        var req = reqCreate('/', '', 'GET');
        var res = resCreate();
        sut(req, res, function next() {
          throw "next should not be called";
        });
        res.message().should.equal('model not found');
    });
  });
});
