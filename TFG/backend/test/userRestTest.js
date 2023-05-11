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

describe ('Testing users managing: CHAI + REST', function (){
  it('should return an array of users',function(done){
    chai.request(url).get("/usuario").end(function (err,res) {
      //console.log(res);
      expect(err).to.be.null;
      expect(res).to.have.status(httpCodes.codes.OK);
      expect(res.body).to.be.an('Array');
      done();
    });
  });
  //Hay que irlo cambiando constantemente
  it('should return 201 for creating new user on Database',function (done){
    chai.request(url)
      .post("/usuario")
      .send({name:"Testing",surname:"testingsur",email:"testingemail3",Administrador:0,password:"tesingpasworrd"})
      .end(function (err,res){
        expect(res).to.have.status(httpCodes.codes.CREATED);
        done();
      });
  });
  it('should return 400 -Falta nombre',function (done){
    chai.request(url)
      .post("/usuario")
      .send({name:"",surname:"testingsur",email:"testingemail",Administrador:0,password:"tesingpasworrd"})
      .end(function (err,res){
        expect(res).to.have.status(httpCodes.codes.BADREQUEST);
        done();
      });
  });
  it('should return 400 -Falta apellido',function (done){
    chai.request(url)
      .post("/usuario")
      .send({name:"hola",surname:"",email:"testingemail",Administrador:0,password:"tesingpasworrd"})
      .end(function (err,res){
        expect(res).to.have.status(httpCodes.codes.BADREQUEST);
        done();
      });
  });
  it('should return 400 -Falta email',function (done){
    chai.request(url)
      .post("/usuario")
      .send({name:"hola",surname:"testingsur",email:"",Administrador:0,password:"tesingpasworrd"})
      .end(function (err,res){
        expect(res).to.have.status(httpCodes.codes.BADREQUEST);
        done();
      });
  });
  it('should return 400 -Falta contraseña',function (done){
    chai.request(url)
      .post("/usuario")
      .send({name:"hola",surname:"testingsur",email:"testingemail",Administrador:0,password:""})
      .end(function (err,res){
        expect(res).to.have.status(httpCodes.codes.BADREQUEST);
        done();
      });
  });

  it('should return 409 for duplicated email',function (done){
    chai.request(url)
      .post("/usuario")
      .send({name:"Testing",surname:"testingsur",email:"testingemail",Administrador:0,password:"tesingpasworrd"})
      .end(function (err,res){
        expect(res).to.have.status(httpCodes.codes.CONFLICT);
        done();
      });
  });
  //Actualizar nombre

  it('should return 200 - Nombre actualizado correctamente',function (done){
    chai.request(url)
      .put("/usuarioNameUpdate")
      .send({name:"CambioDeNombre2",email:"testingemail"})
      .end(function (err,res){
        expect(res).to.have.status(httpCodes.codes.OK);
        done();
      });
  });
  it('should return 409 - No existe usuario',function (done){
    chai.request(url)
      .put("/usuarioNameUpdate")
      .send({name:"NameNoexisto",email:"noexisto"})
      .end(function (err,res){
        expect(res).to.have.status(httpCodes.codes.CONFLICT);
        done();
      });
  });
  it('should return 400 - Request incompleta, falta nombre',function (done){
    chai.request(url)
      .put("/usuarioNameUpdate")
      .send({name:"",email:"noexisto"})
      .end(function (err,res){
        expect(res).to.have.status(httpCodes.codes.BADREQUEST);
        done();
      });
  });
  //Actualizar Apellido
  it('should return 200 - Apellido actualizado correctamente',function (done){
    chai.request(url)
      .put("/usuarioSurnameUpdate")
      .send({surname:"NuevoApellido",email:"testingemail"})
      .end(function (err,res){
        expect(res).to.have.status(httpCodes.codes.OK);
        done();
      });
  });
  it('should return 409 - No existe usuario para actualizar su apellido',function (done){
    chai.request(url)
      .put("/usuarioSurnameUpdate")
      .send({surname:"NameNoexisto",email:"noexisto"})
      .end(function (err,res){
        expect(res).to.have.status(httpCodes.codes.CONFLICT);
        done();
      });
  });
  it('should return 400 - Request incompleta, falta apellido para actualizarlo',function (done){
    chai.request(url)
      .put("/usuarioSurnameUpdate")
      .send({surname:"",email:"noexisto"})
      .end(function (err,res){
        expect(res).to.have.status(httpCodes.codes.BADREQUEST);
        done();
      });
  });
  //Actualizar Contraseña
  it('should return 200 - Contraseña actualizada correctamente',function (done){
    chai.request(url)
      .put("/usuarioPasswordUpdate")
      .send({password:"NuevoPassword",email:"testingemail"})
      .end(function (err,res){
        expect(res).to.have.status(httpCodes.codes.OK);
        done();
      });
  });
  it('should return 409 - No existe usuario para actualizar su contraseña',function (done){
    chai.request(url)
      .put("/usuarioPasswordUpdate")
      .send({password:"Passwordnew",email:"noexisto"})
      .end(function (err,res){
        expect(res).to.have.status(httpCodes.codes.CONFLICT);
        done();
      });
  });
  it('should return 400 - Request incompleta, falta contraseña para actualizarla',function (done){
    chai.request(url)
      .put("/usuarioPasswordUpdate")
      .send({surname:"",email:"noexisto"})
      .end(function (err,res){
        expect(res).to.have.status(httpCodes.codes.BADREQUEST);
        done();
      });
  });
  //DELETE
  it('should return 204 -Usuario eliminado correctamente',function (done){
    chai.request(url)
      .post("/eliminarUsuario")
      .send({email:"testingemail3"})
      .end(function (err,res){
        expect(res).to.have.status(httpCodes.codes.NOCONTENT);
        done();
      });
  });
  it('should return 204 -Usuario no eliminado correctamente, no se encuentra',function (done){
    chai.request(url)
      .delete("/usuario")
      .send({email:"nOEXISTO"})
      .end(function (err,res){
        expect(res).to.have.status(httpCodes.codes.NOTFOUND);
        done();
      });
  });

});
