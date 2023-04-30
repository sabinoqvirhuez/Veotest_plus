console.log("mensaje de prueba");
var express = require ('express'),
  app = express()
  bodyParser = require('body-parser'),


  httpCodes= require ('./api/http/httpCodes'),
  usuario = require ('./api/usuario/userRest');
  const cors = require('cors');
  const router = express.Router();

const PORT = 3000;
const jwt = require ('jsonwebtoken');
const secretKey="my_secret_key";

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Missing authorization header' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

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

//Rutas de peticiones con el front
app.get('/usuario',usuario.listUsers);
app.post('/usuario',usuario.createNewUser);
app.delete('/usuario',usuario.deleteUser);
app.put('/usuarioNameUp',usuario.updateNameUser);

app.post('/iniciarSesion', function(req, res) {
  usuario.findUser(req, res)
    .then(function(resp) {
      var user = {
        email: resp.params.email,
        password: resp.params.password
      }
      if(!user){
        return res.status(401).json({ message: 'Invalid email or password' });
      }
      var token = jwt.sign(user, secretKey);

      res.json({ token });
    })
    .catch(function(err) {
      console.log(err);
      if (!res.headersSent) {
        res.status(httpCodes.codes.SERVERERROR).json(err);
      }
    });
});




  //Faltan las modificaciones en apellidos y contraseña


app.get('/',function(req,res){
  res.status(200).send({message:'GET home route working fine!'});
});
app.use(function(req,res){
  res.status(httpCodes.codes.NOTFOUND).json("Not Found");
})

module.exports = router;
