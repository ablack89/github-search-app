const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const should = chai.should();
const server = require('../app');
const githubClient = require('../server/githubClient.js');


describe('Search API endpoint', function(){
  it('should return bad request when no search query parameter provided', function(done) {
    chai.request(server)
      .get('/api/search')
      .end(function(err, res){
        res.should.have.status(400);
        res.text.should.be.eql("Missing search query")
        done();
      });
  });
  it('should return bad request when empty search query parameter provided', function(done) {
    chai.request(server)
      .get('/api/search?q=')
      .end(function(err, res){
        res.should.have.status(400);
        res.text.should.be.eql("Missing search query")
        done();
      });
  });
  it('should return successful response with search query provided', function(done) {
    chai.request(server)
      .get('/api/search?q=foo')
      .end(function(err, res){
        res.should.have.status(200);
        done();
      });
  });
})


describe('Not found handling', function() {
  it('should return not found error on /foo GET', function(done) {
    chai.request(server)
      .get('/foo')
      .end(function(err, res){
        res.should.have.status(404);
        res.text.should.be.eql("Not found")
        done();
      });
  });
});
