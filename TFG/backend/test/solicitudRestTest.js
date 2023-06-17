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

describe('Testing createNewSolicitud', function (){
  it('should return 201 - Nueva solicitud creada',function (done){
    chai.request(url).post("/solicitudes")
      .send({
        Userid: 65,
        name: "Veotest-jkl"
      })
      .end(function (err,res){
        expect(res).to.have.status(httpCodes.codes.CREATED);
        done();
      })
  });
  it('should return 409 - El robot al que intenta solicitar acceso no existe.',function (done){
    chai.request(url).post("/solicitudes")
      .send({
        Userid: 65,
        name: "ninguno"
      })
      .end(function (err,res){
        expect(res).to.have.status(httpCodes.codes.CONFLICT);
        done();
      })
  });
  it('should return 400 - Error, faltan datos, petición mal formada.',function (done){
    chai.request(url).post("/keys")
      .send({
        Userid: 65,
        name: ""
      })
      .end(function (err,res){
        expect(res).to.have.status(httpCodes.codes.BADREQUEST);
        done();
      })
  });
});

describe('Testing updateEstadoSolicitud', function (){
  it('should return 200 - Solicitud actualizada correctamente',function (done){
    chai.request(url).put("/solicitudes")
      .send({
        Userid: 65,
        Robotid: 35,
        Estado: 1
      })
      .end(function (err,res){
        expect(res).to.have.status(httpCodes.codes.OK);
        done();
      })
  });

  it('should return 400 - Error, falta Userid, petición mal formada',function (done){
    chai.request(url).put("/solicitudes")
      .send({
        Userid: null,
        Robotid: 35,
        Estado: 1
      })
      .end(function (err,res){
        expect(res).to.have.status(httpCodes.codes.BADREQUEST);
        done();
      })
  });

  it('should return 400 - Error, falta Estado, petición mal formada',function (done){
    chai.request(url).put("/solicitudes")
      .send({
        Userid: 65,
        Robotid: 35,
        Estado: null
      })
      .end(function (err,res){
        expect(res).to.have.status(httpCodes.codes.BADREQUEST);
        done();
      })
  });

  it('should return 400 - Error, falta Robotid, petición mal formada',function (done){
    chai.request(url).put("/solicitudes")
      .send({
        Userid: 65,
        Robotid: null,
        Estado: 1
      })
      .end(function (err,res){
        expect(res).to.have.status(httpCodes.codes.BADREQUEST);
        done();
      })
  });

  it('should return 409 - Error, la solicitud que intenta actualizar no existe',function (done){
    chai.request(url).put("/solicitudes")
      .send({
        Userid: 65,
        Robotid: 9,
        Estado: 1
      })
      .end(function (err,res){
        expect(res).to.have.status(httpCodes.codes.CONFLICT);
        done();
      })
  });

});

describe('Testing  listSolicitudes', function (){

  it('should return 200 - Lista todas las solicitudes del sistema',function (done){
    chai.request(url).get("/solicitudes")
      .end(function (err,res){
        expect(res).to.have.status(httpCodes.codes.OK);
        expect(res.body).to.be.an('Array');
        done();
      })
  });

});

describe('Testing listMySolicitudes', function (){

  it('should return 200 - Lista las solicitudes el usuario introducido',function (done){
    chai.request(url).get("/solicitudes/65")
      .end(function (err,res){
        expect(res).to.have.status(httpCodes.codes.OK);
        expect(res.body).to.be.an('Array');
        done();
      })
  });

});
describe('Testing deleteSolicitud', function (){

  it('should return 204 - Error, la solicitud que intenta actualizar no existe',function (done){
    chai.request(url).delete("/solicitudes/35/65")
      .end(function (err,res){
        expect(res).to.have.status(httpCodes.codes.NOCONTENT);
        done();
      })
  });

  it('should return 404 - Error, la solicitud que intenta actualizar no existe',function (done){
    chai.request(url).delete("/solicitudes/9/10")
      .end(function (err,res){
        expect(res).to.have.status(httpCodes.codes.NOTFOUND);
        done();
      })
  });

});
