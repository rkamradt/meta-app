var should = require('should');
var fs = require('fs');
var express = require('express');
var metaApp = require('../index');
var modelsFactory = require('../meta-data/meta-models');

var json = JSON.parse(fs.readFileSync('test/meta-data.json'));
var data = JSON.parse(fs.readFileSync('test/test-data.json'));

describe('Meta-App main', function() {
  var app;
  before(function(done) {
    app = express();
    done();
  });
  describe('Create a memory store', function() {
    it('should be able to create a memory store', function() {
      var sut = metaApp(json);
      var result = sut.createMemoryStore('User');
      // todo more rigorous tests
      result.should.be.instanceof(Object);
    });
  });
  describe('Create a file store', function() {
    it('should be able to create a file store', function() {
      var sut = metaApp(json);
      var result = sut.createFileStore('User', 'testfile.json');
      // todo more rigorous tests
      result.should.be.instanceof(Object);
    });
  });
  describe('Create a mongo store', function() {
    it('should be able to create a mongo store', function() {
      var sut = metaApp(json);
      var result = sut.createMongoStore('User', 'mongodb://localhost:27017/myproject', 'testCollection');
      // todo more rigorous tests
      result.should.be.instanceof(Object);
    });
  });
  describe('Create an object creator', function() {
    it('should be able to create an object creator', function() {
      var sut = metaApp(json);
      var result = sut.modelsFactory();
      // todo more rigorous tests
      result.should.be.instanceof(Object);
    });
  });
  describe('Create an rest web service', function() {
    it('should be able to create a rest web service', function() {
      var sut = metaApp(json);
      sut.useMetaRest(app, sut.createMemoryStore('User'));
      // todo more rigorous tests
    });
  });
});
