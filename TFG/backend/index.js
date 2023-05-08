console.log("mensaje de prueba");
var express = require ('express'),
  app = express()
  bodyParser = require('body-parser'),


  httpCodes= require ('./api/http/httpCodes'),
    tokenV=require('./api/usuario/tokenRest')
  usuario = require ('./api/usuario/userRest');
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

//Rutas de peticiones con el front
app.get('/usuario',tokenV.verifyToken,usuario.listUsers);
app.post('/usuario',usuario.createNewUser);
app.delete('/usuario',usuario.deleteUser);
app.put('/usuarioNameUpdate',usuario.updateNameUser);
app.put('/usuarioSurnameUpdate',usuario.updateSurnameUser);
app.put('/usuarioPasswordUpdate',usuario.updatePasswordUser);

app.post('/iniciarSesion', usuario.checkAuthorization);
//Faltan las modificaciones en apellidos y contraseña

app.get('/',function(req,res){
  res.status(200).send({message:'GET home route working fine!'});
});
app.use(function(req,res){
  res.status(httpCodes.codes.NOTFOUND).json("Not Found");
})

module.exports = router;
