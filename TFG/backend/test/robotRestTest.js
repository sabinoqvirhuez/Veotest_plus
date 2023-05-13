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

describe('Testing listRobots', function (){
  it('should return an array of robots',function (done){
    chai.request(url).get("/robots").end(function (err,res){
      expect(err).to.be.null;
      expect(res).to.have.status(httpCodes.codes.OK);
      expect(res.body).to.be.an('Array');
      done();
    })
  });
});

describe ('Testing createNewRobot', function () {
  //Hay que irlo cambiando constantemente
  it('should return 201 for creating new robot on Database', function (done) {
    chai.request(url)
      .post("/robots")
      .send({
        name: "Testing4",
        description: "Descripcion de prueba"
      })
      .end(function (err, res) {
        expect(res).to.have.status(httpCodes.codes.CREATED);
        done();
      });
  });

  it('should return 400 -Falta nombre', function (done) {
    chai.request(url)
      .post("/robots")
      .send({name: "", description: "tesingpasworrd"})
      .end(function (err, res) {
        expect(res).to.have.status(httpCodes.codes.BADREQUEST);
        done();
      });
  });
  it('should return 400 -Falta descripcion', function (done) {
    chai.request(url)
      .post("/robots")
      .send({name: "Testing4", description: ""})
      .end(function (err, res) {
        expect(res).to.have.status(httpCodes.codes.BADREQUEST);
        done();
      });
  });
  it('should return 409 -Nombre duplicado', function (done) {
    chai.request(url)
      .post("/robots")
      .send({name: "TC-HJL", description: "tesingpasworrd"})
      .end(function (err, res) {
        expect(res).to.have.status(httpCodes.codes.CONFLICT);
        done();
      });
  });

});

describe ('Testing updateDescriptionRobot', function () {
  //Actualizar descripcion

  it('should return 200 - Descripción actualizado correctamente', function (done) {
    chai.request(url)
      .put("/robots")
      .send({name: "Testing4", description:"Description Actualizada"})
      .end(function (err, res) {
        expect(res).to.have.status(httpCodes.codes.OK);
        done();
      });
  });
  it('should return 409 - No existe robot, no se ha podido actualizar el nombre', function (done) {
    chai.request(url)
      .put("/robots")
      .send({name: "NameNoexisto", description: "noexisto"})
      .end(function (err, res) {
        expect(res).to.have.status(httpCodes.codes.CONFLICT);
        done();
      });
  });
  it('should return 400 - Request incompleta, falta nombre', function (done) {
    chai.request(url)
      .put("/robots")
      .send({name: "", description: "noexisto"})
      .end(function (err, res) {
        expect(res).to.have.status(httpCodes.codes.BADREQUEST);
        done();
      });
  });
});

describe ('Testing deleteRobot', function () {
  it('should return 204 -Usuario eliminado correctamente', function (done) {
    chai.request(url)
      .post("/eliminarRobot")
      .send({name: "Testing4"})
      .end(function (err, res) {
        expect(res).to.have.status(httpCodes.codes.NOCONTENT);
        done();
      });
  });
  it('should return 204 -Usuario no eliminado correctamente, no se encuentra registrado', function (done) {
    chai.request(url)
      .post("/eliminarRobot")
      .send({name: "nOEXISTO"})
      .end(function (err, res) {
        expect(res).to.have.status(httpCodes.codes.NOTFOUND);
        done();
      });
  });

});
