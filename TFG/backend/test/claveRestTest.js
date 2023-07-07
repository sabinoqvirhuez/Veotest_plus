'use strict';
/*
if (!global.Promise) {
  global.Promise = require('q');
}
var chai = require('chai'),
  chaiHttp = require('chai-http');
const expect = require('chai').expect;

var httpCodes=require('../api/http/httpCodes');

chai.use(chaiHttp);
const url = "http://localhost:3000";



describe('Testing createNewKey', function (){
  it('should return 201 - Nueva clave creada',function (done){
    chai.request(url).post("/keys")
      .send({
        Userid: 11,
        Clave: "egjusjsdoeokfmUk9/ksnwdjsmnskdkmnvxsargbvder"
      })
      .end(function (err,res){
        expect(res).to.have.status(httpCodes.codes.CREATED);
        done();
      })
  });
  it('should return 400 - Error, Falta clave',function (done){
    chai.request(url).post("/keys")
      .send({
        Userid: 11,
        Clave: ""
      })
      .end(function (err,res){
        expect(res).to.have.status(httpCodes.codes.BADREQUEST);
        done();
      })
  });
  it('should return 409 - Error, Este usuario ya tiene una clave asignada',function (done){
    chai.request(url).post("/keys")
      .send({
        Userid: 11,
        Clave: "aaaa"
      })
      .end(function (err,res){
        expect(res).to.have.status(httpCodes.codes.CONFLICT);
        done();
      })
  });
});

describe('Testing showKey', function (){
  it('should return 200 y un array de datos,tipo key',function (done){
    chai.request(url).get("/keys/11").end(function (err,res){
      expect(err).to.be.null;
      expect(res).to.have.status(httpCodes.codes.OK);
      expect(res.body).to.be.an('Array');
      done();
    })
  });
  it('should return 404- Error, No se encontró la clave dada',function (done){
    chai.request(url).get("/keys/230").end(function (err,res){
      expect(err).to.be.null;
      expect(res).to.have.status(httpCodes.codes.NOTFOUND);
      done();
    })
  });
});


describe('Testing deleteKey', function (){
  it('should return 204 - Clave del usuario eliminada correctamente',function (done){
    chai.request(url).delete("/keys/11")
      .end(function (err,res){
        expect(res).to.have.status(httpCodes.codes.NOCONTENT);
        done();
      })
  });
  it('should return 404 - Error, no se encontró al usuario introducido',function (done){
    chai.request(url).delete("/keys/150")
      .end(function (err,res){
        expect(res).to.have.status(httpCodes.codes.NOTFOUND);
        done();
      })
  });

});





 */


