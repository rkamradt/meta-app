var should = require('should');
var rest = require('meta-api-rest');

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
        var req.url = '/modelname1';
        sut(req, res, next() {
          should.not.be.here();
        });
        req.response.body.should.be.('looking at model modelname2');
    });
  });
});
