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
        description: "Descripcion de prueba",
        dispositivo:"ejdis",
        direccion:"ejdirec",
        disponible:1
      })
      .end(function (err, res) {
        expect(res).to.have.status(httpCodes.codes.CREATED);
        done();
      });
  });

  it('should return 400 -Falta nombre', function (done) {
    chai.request(url)
      .post("/robots")
      .send({name: "", description: "tesingpasworrd",dispositivo:"ejdis",direccion:"ejdirec",disponible:1})
      .end(function (err, res) {
        expect(res).to.have.status(httpCodes.codes.BADREQUEST);
        done();
      });
  });
  it('should return 400 -Falta descripcion', function (done) {
    chai.request(url)
      .post("/robots")
      .send({name: "Testing4", description: "",dispositivo:"ejdis",direccion:"ejdirec",disponible:1})
      .end(function (err, res) {
        expect(res).to.have.status(httpCodes.codes.BADREQUEST);
        done();
      });
  });
  it('should return 409 -Nombre duplicado', function (done) {
    chai.request(url)
      .post("/robots")
      .send({name: "TCK-092", description: "tesingpasworrd",dispositivo:"ejdis",direccion:"ejdirec",disponible:1})
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
  it('should return 409 - No existe robot, no se ha podido actualizar la descripción', function (done) {
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
  it('should return 400 - Request incompleta, falta descripción', function (done) {
    chai.request(url)
      .put("/robots")
      .send({name: "TCK-092", description: ""})
      .end(function (err, res) {
        expect(res).to.have.status(httpCodes.codes.BADREQUEST);
        done();
      });
  });
});

describe ('Testing updateDispositivoRobot', function () {
  //Actualizar dispositivo

  it('should return 200 - Dispositivo actualizado correctamente', function (done) {
    chai.request(url)
      .put("/robotsDispositivo")
      .send({name: "Testing4", dispositivo:"dispositivo Actualizada"})
      .end(function (err, res) {
        expect(res).to.have.status(httpCodes.codes.OK);
        done();
      });
  });
  it('should return 409 - No existe robot, no se ha podido actualizar el dispositivo', function (done) {
    chai.request(url)
      .put("/robotsDispositivo")
      .send({name: "NameNoexisto", dispositivo: "noexisto"})
      .end(function (err, res) {
        expect(res).to.have.status(httpCodes.codes.CONFLICT);
        done();
      });
  });
  it('should return 400 - Request incompleta, falta nombre', function (done) {
    chai.request(url)
      .put("/robotsDispositivo")
      .send({name: "", dispositivo: "noexisto"})
      .end(function (err, res) {
        expect(res).to.have.status(httpCodes.codes.BADREQUEST);
        done();
      });
  });
  it('should return 400 - Request incompleta, falta dispositivo', function (done) {
    chai.request(url)
      .put("/robotsDispositivo")
      .send({name: "TCK-092", dispositivo: ""})
      .end(function (err, res) {
        expect(res).to.have.status(httpCodes.codes.BADREQUEST);
        done();
      });
  });
});

describe ('Testing updateDireccionRobot', function () {
  //Actualizar direccion

  it('should return 200 - Dirección actualizado correctamente', function (done) {
    chai.request(url)
      .put("/robotsDireccion")
      .send({name: "Testing4", direccion:"dirección Actualizada"})
      .end(function (err, res) {
        expect(res).to.have.status(httpCodes.codes.OK);
        done();
      });
  });
  it('should return 409 - No existe robot, no se ha podido actualizar la dirección', function (done) {
    chai.request(url)
      .put("/robotsDireccion")
      .send({name: "NameNoexisto", direccion: "noexisto"})
      .end(function (err, res) {
        expect(res).to.have.status(httpCodes.codes.CONFLICT);
        done();
      });
  });
  it('should return 400 - Request incompleta, falta nombre', function (done) {
    chai.request(url)
      .put("/robotsDireccion")
      .send({name: "", direccion: "noexisto"})
      .end(function (err, res) {
        expect(res).to.have.status(httpCodes.codes.BADREQUEST);
        done();
      });
  });
  it('should return 400 - Request incompleta, falta dirección', function (done) {
    chai.request(url)
      .put("/robotsDireccion")
      .send({name: "TCK-092", direccion: ""})
      .end(function (err, res) {
        expect(res).to.have.status(httpCodes.codes.BADREQUEST);
        done();
      });
  });
});

describe ('Testing updateDisponibleRobot', function () {
  //Actualizar disponibilidad

  it('should return 200 - Disponibilidad actualizado correctamente', function (done) {
    chai.request(url)
      .put("/robotsDispo")
      .send({name: "TCK-092", disponible:0})
      .end(function (err, res) {
        expect(res).to.have.status(httpCodes.codes.OK);
        done();
      });
  });
  it('should return 409 - No existe robot, no se ha podido actualizar la disponibilidad', function (done) {
    chai.request(url)
      .put("/robotsDispo")
      .send({name: "NameNoexist", disponible:0})
      .end(function (err, res) {
        expect(res).to.have.status(httpCodes.codes.CONFLICT);
        done();
      });
  });
  it('should return 400 - Request incompleta, falta nombre', function (done) {
    chai.request(url)
      .put("/robotsDispo")
      .send({name: "", disponible:0})
      .end(function (err, res) {
        expect(res).to.have.status(httpCodes.codes.BADREQUEST);
        done();
      });
  });
  it('should return 400 - Request incompleta, falta el campo disponibilidad', function (done) {
    chai.request(url)
      .put("/robotsDispo")
      .send({name: "TCK-092", disponible:null})
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
