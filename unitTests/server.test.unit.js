var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();

chai.use(chaiHttp);

describe('Hello world', function() {
  it('should return hello world on / GET');
});

it('should return hello world on / GET', function(done) {
  chai.request(server)
    .get('/')
    .end(function(err, res){
      res.should.have.status(200);
      res.text.should.be.eql("Hello world\n")
      done();
    });
});
