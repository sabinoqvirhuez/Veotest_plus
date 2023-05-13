console.log("mensaje de prueba");
var express = require ('express'),
  app = express()
  bodyParser = require('body-parser'),


  httpCodes= require ('./api/http/httpCodes'),
    tokenV=require('./api/usuario/tokenRest')
  usuario = require ('./api/usuario/userRest'),
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
app.get('/usuario',usuario.listUsers);
app.post('/usuario',usuario.createNewUser);
app.post('/eliminarUsuario',usuario.deleteUser);
app.put('/usuarioNameUpdate',usuario.updateNameUser);
app.put('/usuarioSurnameUpdate',usuario.updateSurnameUser);
app.put('/usuarioPasswordUpdate',usuario.updatePasswordUser);
app.post('/profile',usuario.listOneUser);
app.post('/iniciarSesion', usuario.checkAuthorization);

/*
tokenV.verifyToken,
 */

//Peticiones de Robots
app.get('/robots',robots.listRobots);
app.put('/robots',robots.updateDescriptionRobot);
app.post('/robots',robots.createNewRobot);
app.post('/eliminarRobot',robots.deleteRobot);

module.exports = router;
