var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();

chai.use(chaiHttp);


describe('Not found', function() {
  it('should return not found error on /foo GET');
});


it('should return not found error on /foo GET', function(done) {
  chai.request(server)
    .get('/foo')
    .end(function(err, res){
      res.should.have.status(404);
      res.text.should.be.eql("Not found")
      done();
    });
});
