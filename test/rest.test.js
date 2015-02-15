var should = require('should');
var fs = require('fs');
var rest = require('../meta-api-rest');
var reqCreate = require('./req-create.js')();
var resCreate = require('./res-create.js')();

var json = JSON.parse(fs.readFileSync('meta-data.json'));
var test = JSON.parse(fs.readFileSync('test-data.json'));


describe('Rest API', function(){
  var self = this;
  beforeEach(function(done) {
    done(); // when we use a database, all of this will need to be asynchronous
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
