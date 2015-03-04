var should = require('should');
var request = require('supertest');
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var morgan = require('morgan');
var fs = require('fs');
var filestore = require('../meta-data/mongo-storage');
var metadataMap = require('../meta-data/meta-create');
var router = require('../meta-data/meta-rest');


describe('Rest API', function(){
  var app;
  before(function(done) {
    app = express();
    // todo parameterize this to allow production/test alternatives
    var json = JSON.parse(fs.readFileSync('test/meta-data.json'));
    var metadata = metadataMap(json);

    app.use(bodyParser.urlencoded({extended: true}));

    // parse application/json
    app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(morgan("dev", { format: 'dev', immediate: true }));
    router(app, json, filestore(metadata.findMetadata('User'),'testfile.json'));
    done();
  });
  it('should be able to insert a new User', function(done) {
    var body = {
      "firstName": "Randal",
      "lastName": "Kamradt",
      "email": "randysr@kamradtfamily.net",
      "password": "RjklstTJR"
    };
    request(app)
      .put('/User')
      .send(body)
      .expect(200) //Status code
      .end(function(err,res) {
        if (err) {
          throw err;
        }
        done();
    });
  });
  it('should be able to find a User by email', function(done) {
    request(app)
      .get('/User/randysr@kamradtfamily.net')
      .expect(200) //Status code
//      .expect('Content-Type', /json/)
      .end(function(err,res) {
        if (err) {
          throw err;
        }
        res.body.should.be.instanceOf(Object);
        res.body.should.have.property('firstName', 'Randal');
        res.body.should.have.property('lastName', 'Kamradt');
        done();
    });
  });
});
