/*
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

describe('Testing createNewIncidencias', function (){
  it('should return 201 - Nueva incidencia creada',function (done){
    chai.request(url).post("/incidencias")
      .send({
        Userid: 67,
        Nombre: "PruebaName",
        Description:"PruebaDescription"
      })
      .end(function (err,res){
        expect(res).to.have.status(httpCodes.codes.CREATED);
        done();
      })
  });

  it('should return 400 - Error, petición mal formada, falta Userid',function (done){
    chai.request(url).post("/incidencias")
      .send({
        Userid: null,
        Nombre: "PruebaName",
        Description:"PruebaDescription"
      })
      .end(function (err,res){
        expect(res).to.have.status(httpCodes.codes.BADREQUEST);
        done();
      })
  });
  it('should return 400 - Error, petición mal formada, falta Nombre',function (done){
    chai.request(url).post("/incidencias")
      .send({
        Userid: 67,
        Nombre: "",
        Description:"PruebaDescription"
      })
      .end(function (err,res){
        expect(res).to.have.status(httpCodes.codes.BADREQUEST);
        done();
      })
  });

  it('should return 400 - Error, petición mal formada, falta Description',function (done){
    chai.request(url).post("/incidencias")
      .send({
        Userid: 67,
        Nombre: "PruebaNombre",
        Description:""
      })
      .end(function (err,res){
        expect(res).to.have.status(httpCodes.codes.BADREQUEST);
        done();
      })
  });

});

describe('Testing  listIncidencias', function (){

  it('should return 200 - Lista todas las incidencias del sistema',function (done){
    chai.request(url).get("/incidencias")
      .end(function (err,res){
        expect(res).to.have.status(httpCodes.codes.OK);
        expect(res.body).to.be.an('Array');
        done();
      })
  });

});

describe('Testing  listMyIncidencias', function (){

  it('should return 200 - Lista todas las incidencias del usuario id',function (done){
    chai.request(url).get("/incidencias/:id")
      .end(function (err,res){
        expect(res).to.have.status(httpCodes.codes.OK);
        expect(res.body).to.be.an('Array');
        done();
      })
  });

});

describe('Testing updateDescriptionIncidencia', function (){
  it('should return 200 - Incidencia actualizada correctamente',function (done){
    chai.request(url).put("/incidencias")
      .send({
        Idincidencia: 11,
        Userid:67,
        Nombre: "",
        Description: "TestingDescription"
      })
      .end(function (err,res){
        expect(res).to.have.status(httpCodes.codes.OK);
        done();
      })
  });

  it('should return 400 - Error, falta Userid, petición mal formada',function (done){
    chai.request(url).put("/incidencias")
      .send({
        Idincidencia: null,
        Userid:67,
        Nombre: "",
        Description: "Hola"
      })
      .end(function (err,res){
        expect(res).to.have.status(httpCodes.codes.BADREQUEST);
        done();
      })
  });

  it('should return 400 - Error, falta Description, petición mal formada',function (done){
    chai.request(url).put("/incidencias")
      .send({
        Idincidencia: 11,
        Userid:67,
        Nombre: "",
        Description: ""
      })
      .end(function (err,res){
        expect(res).to.have.status(httpCodes.codes.BADREQUEST);
        done();
      })
  });


  it('should return 409 - Error, la incidencia que intenta actualizar no existe',function (done){
    chai.request(url).put("/incidencias")
      .send({
        Idincidencia: 900,
        Userid:67,
        Nombre: "",
        Description: "TestingHola"
      })
      .end(function (err,res){
        expect(res).to.have.status(httpCodes.codes.CONFLICT);
        done();
      })
  });
});

describe('Testing listOneIncidencias',function (){
  it('should return 200 - Lista una incidencia',function (done){
    chai.request(url).get("/incidenciaProfile/12/8")
      .end(function (err,res){
        expect(res).to.have.status(httpCodes.codes.OK);
        expect(res.body).to.be.an('Array');
        done();
      })
  });
});



describe('Testing deleteIncidencias', function (){

  it('should return 204 - Incidencia eliminada correctamente',function (done){
    chai.request(url).delete("/incidencias/13/67")
      .end(function (err,res){
        expect(res).to.have.status(httpCodes.codes.NOCONTENT);
        done();
      })
  });

  it('should return 404 - Error, la incidencia que intenta eliminar no existe',function (done){
    chai.request(url).delete("/incidencias/900/65")
      .end(function (err,res){
        expect(res).to.have.status(httpCodes.codes.NOTFOUND);
        done();
      })
  });

});

 */





