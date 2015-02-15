var should = require('should');
var fs = require('fs');
var rest = require('../meta-api-rest');

var json = JSON.parse(fs.readFileSync('meta-data.json'));


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
        var req = {
          'url': '/modelname1'
        };
        var res = {
          'end': function(s) {
            endvalue = s;
          }
        };
        sut(req, res, function next() {
          throw "next should not be called";
        });
        endvalue.should.equal('looking at model modelname1');
    });
    it('should be able to return modelname2 with /modelname2' , function(){
        var sut = rest(json);
        var endvalue = '';
        var req = {
          'url': '/modelname2'
        };
        var res = {
          'end': function(s) {
            endvalue = s;
          }
        };
        sut(req, res, function next() {
          throw "next should not be called";
        });
        endvalue.should.equal('looking at model modelname2');
    });
    it('should return model not found with path /' , function(){
        var sut = rest(json);
        var endvalue = '';
        var req = {
          'url': '/'
        };
        var res = {
          'end': function(s) {
            endvalue = s;
          }
        };
        sut(req, res, function next() {
          throw "next should not be called";
        });
        endvalue.should.equal('model not found');
    });
  });
});
