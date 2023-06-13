console.log("mensaje de prueba");
var express = require ('express'),
  app = express()
  bodyParser = require('body-parser'),
  httpCodes= require ('./api/http/httpCodes'),
    tokenV=require('./api/usuario/tokenRest')
  usuario = require ('./api/usuario/userRest'),
    clave= require('./api/claves/claveRest'),
    solicitud = require('./api/solicitudes/solicitudRest')
    robots=require('./api/robots/robotUser');
  const cors = require('cors');
const {verify} = require("jsonwebtoken");
  const router = express.Router();
const PORT = 3000;
// cors permite las peticiones de dominio cruzado
app.use(cors());
app.use(express.json());
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//Detección de la parada del servidor
app.listen(PORT,function(){
  console.log("Node Server at http://localhost:"+PORT);
});

//Peticiones de Usuario
app.get('/usuario',tokenV.verifyToken,usuario.listUsers);
app.post('/usuario',tokenV.verifyToken,usuario.createNewUser);
app.delete('/eliminarUsuario/:email',usuario.deleteUser);
app.put('/usuarioNameUpdate',tokenV.verifyToken,usuario.updateNameUser);
app.put('/usuarioSurnameUpdate',tokenV.verifyToken,usuario.updateSurnameUser);
app.put('/usuarioPasswordUpdate',tokenV.verifyToken,usuario.updatePasswordUser);
app.get('/profile/:id',tokenV.verifyToken,usuario.listOneUser);
app.post('/iniciarSesion', usuario.checkAuthorization);

/*
tokenV.verifyToken,
 */

//Peticiones de Robots
app.get('/robots',tokenV.verifyToken,robots.listRobots);
app.put('/robots',tokenV.verifyToken,robots.updateDescriptionRobot);
app.put('/robotsDispositivo',tokenV.verifyToken,robots.updateDispositivoRobot);
app.put('/robotsDireccion',tokenV.verifyToken,robots.updateDireccionRobot);
app.put('/robotsDispo',tokenV.verifyToken,robots.updateDisponibleRobot);
app.post('/robots',tokenV.verifyToken,robots.createNewRobot);
app.delete('/eliminarRobot/:name',tokenV.verifyToken,robots.deleteRobot);
app.get('/profileRobot/:name',tokenV.verifyToken,robots.showRobot);


//Peticiones de Claves

app.get('/keys/:id',tokenV.verifyToken,clave.showKey);
app.post('/keys',tokenV.verifyToken,clave.createNewKey);
app.delete('/keys/:id',tokenV.verifyToken,clave.deleteKey);

//Peticiones de Solicitudes

app.post('/solicitudes',tokenV.verifyToken,solicitud.createNewSolicitud);
app.delete('/solicitudes/:Robotid/:Userid',tokenV.verifyToken,solicitud.deleteSolicitud);
app.put('/solicitudes',tokenV.verifyToken,solicitud.updateEstadoSolicitud);
app.get('/solicitudes/:Userid',tokenV.verifyToken,solicitud.listMySolicitudes);
app.get('/solicitudes',tokenV.verifyToken,solicitud.listSolicitudes);
app.post('/acceso',tokenV.verifyToken,solicitud.darAcceso);
app.post('/noacceso',tokenV.verifyToken,solicitud.quitarAcceso);
module.exports = router;
