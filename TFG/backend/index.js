console.log("mensaje de prueba");
var express = require ('express'),
  app = express()
  bodyParser = require('body-parser'),


  httpCodes= require ('./api/http/httpCodes'),
  usuario = require ('./api/usuario/userRest');
  const cors = require('cors');
  const router = express.Router();

const PORT = 3000;

// cors permite las peticiones de dominio cruzado

app.use(cors());
app.use(express.json());

//Detección de la parada del servidor
app.listen(PORT,function(){
  console.log("Node Server at http://localhost:"+PORT);
});


//manejo de rutas por express: Rest ==> CRUD
app.get('/prueba',(req,res)=>{
  res.status(200).send({
    message:"Prueba cargada correctamente"
  });
});
app.get('/usuario',usuario.listUsers);
app.post('/usuario',usuario.createNewUser);
//app.get('/usuario',usuario.listUsers);
app.delete('/usuario',usuario.deleteUser);
app.post('/iniciarSesion',usuario.findUser);


app.get('/',function(req,res){
  res.status(200).send({message:'GET home route working fine!'});
});
app.use(function(req,res){
  res.status(httpCodes.codes.NOTFOUND).json("Not Found");
})

module.exports = router;
