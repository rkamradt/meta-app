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
    /*
    // Use connect method to connect to the Server
    MongoClient.connect(url, function(err, db) {
      if(err) return done(err);
      var collection = db.collection('documents');
      collection.drop(function(err, result) {
        if(err) console.log('drop: ' + err);
        collection = db.collection('documents');
        var tarray = [];
        tarray[0] = test;
        collection.insert(tarray, function(err, result) {
          if(err) return done(err);
          db.close();
          done();
        });
      });
    });
    */
    done();
  });
  afterEach(function(done) {
    done(); // when we use a database, all of this will need to be asynchronous
  });
  describe('modelname1', function(){
    it('should be able to return User with /User' , function(){
        var sut = rest(json);
        var endvalue = '';
        var req = reqCreate('/User', '', 'GET');
        var res = resCreate();
        sut(req, res, function next() {
          throw "next should not be called";
        });
        res.message().should.equal('GET processing on model /User\n');
    });
    it('should be able to return modelname2 with /modelname2' , function(){
        var sut = rest(json);
        var endvalue = '';
        var req = reqCreate('/modelname2', '', 'GET');
        var res = resCreate();
        sut(req, res, function next() {
          throw "next should not be called";
        });
        res.message().should.equal('GET processing on model /modelname2\n');
    });
    it('should return model not found with path /foo' , function(){
        var sut = rest(json);
        var endvalue = '';
        var req = reqCreate('/foo', '', 'GET');
        var res = resCreate();
        sut(req, res, function next() {
          throw "next should not be called";
        });
        res.message().should.equal('model /foo not found\n');
    });
    it('should return model not found with path /' , function(){
        var sut = rest(json);
        var endvalue = '';
        var req = reqCreate('/', '', 'GET');
        var res = resCreate();
        sut(req, res, function next() {
          throw "next should not be called";
        });
        res.message().should.equal('model / not found\n');
    });
  });
});
