'use strict';
if (!global.Promise) {
  global.Promise = require('q');
}
var chai = require('chai'),
  chaiHttp = require('chai-http');
const expect = require('chai').expect;

var httpCodes=require('../api/http/httpCodes');

chai.use(chaiHttp);
const url = "http://localhost:3000";

describe('Testing showKey', function (){
  it('should return an array of robots',function (done){
    chai.request(url).get("/robots").end(function (err,res){
      expect(err).to.be.null;
      expect(res).to.have.status(httpCodes.codes.OK);
      expect(res.body).to.be.an('Array');
      done();
    })
  });
});
