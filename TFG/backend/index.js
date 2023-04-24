var express = require ("express"),
  app = express(),
  bodyParser = require('body-parser'),
  cors = require('cors');

httpCodes= require ('./api/http/httpCodes');
usuario = require ('./api/usuario/userRest');

const PORT = 3000;

// cors permite las peticiones de dominio cruzado
app.options('*',cors());
app.use(cors());

//Utilización del bodyParses para decodificar los datos en el cuerpo

app.use(bodyParser.urlencoded({
  extended:true,
}));

app.use(bodyParser.json());

//manejo de rutas por express: Rest ==> CRUD
app.get('/prueba',(req,res)=>{
  res.status(200).send({
    message:"Prueba cargada correctamente"
  });
});
app.get('/usuario',usuario.listUsers);
app.post('/usuario',usuario.listUsers);
//app.get('/usuario',usuario.listUsers);
app.get('/usuario',usuario.listUsers);


app.get('/',function(req,res){
  res.status(200).send({message:'GET home route working fine!'});
});
app.use(function(req,res){
  res.status(httpCodes.codes.NOTFOUND).json("Not Found");
})
//Detección de la parada del servidor
app.listen(PORT,function(){
  console.log("Node Server at http://localhost:"+PORT);
});
