const jwt = require ('jsonwebtoken');
function verifyToken(req, res, next) {
  try {
    const token = req.get('token').split(' ')[1];
    const decodedToken = jwt.verify(token, 'secretKey');
    req.userId = decodedToken.id;
    next();
  } catch {
    res.status(401).send('Unauthorized Request');
  }
}

/*
function verifyToken(req,res,next){
  if(!req.get('token')){
    console.log("Salto en el primer if")
    return res.status(401).send("Unathorize Request");

  }
  var aux2 = req.get('token').split(' ')[1];
  console.log(aux2);

  if (aux2 === 'null'){
    console.log("Salto en el segundo if")
    return res.status(401).send("Unathorize Request");

  }
  var payload = jwt.verify(aux2,'secretKey');
//Puedo agregar la propiedad User id a request, así luego lo puede leer los métodos del backend
  req.UserId=payload.id;
  next();
}

 */
exports.verifyToken=verifyToken;
