var should = require('should');
var request = require('supertest');

var url = 'http://localhost:9999';

describe('Rest API', function(){
  it('should be able to insert a new User', function(done) {
    var body = {
      "firstName": "Randal",
      "lastName": "Kamradt",
      "email": "randysr@kamradtfamily.net",
      "password": "RjklstTJR"
    };
    request(url)
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
    request(url)
      .get('/User/randysr@kamradtfamily.net')
      .expect(200) //Status code
//      .expect('Content-Type', /json/)
      .end(function(err,res) {
        if (err) {
          throw err;
        }
        done();
    });
  });
});
