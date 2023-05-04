const jwt = require ('jsonwebtoken');
const secretKey="my_secret_key";

var httpCodes = require ('../http/httpCodes'),
  db = require ('../database/dbManage');
const {catchError} = require("rxjs");


const DBERROR = "Database Server Error";

//Comprueba si el usuario exista en nuestra BDD
function checkUserExists(email,conn){
  const NOPROD = "non existent user";
  var sql;
  sql = "SELECT * FROM  usuarios WHERE email ='"+email+"'";

  let laPromesa = new Promise (function(resolve,reject){
    conn.query(sql,function(err,result){
      if (err){
        console.log("Error,email duplicado")
        reject (DBERROR);
      }
      else {
        if(result.length>0)
          resolve(result[0]);
        else
          reject (NOPROD);
      }

    });
  });
  return laPromesa;
}

// Lista los usuarios almacenados en nuestra bdd
function listUsers(req,res){
  'use strict';
  var mycon = db.doConnection();
  var sql = "Select * FROM usuarios";
  //console.log("User global search");
  mycon.query(sql,function(err,result){
    if(err){
      console.log (err);
      res.status(httpCodes.codes.SERVERERROR).json(DBERROR);

    }
    else{

      res.status(httpCodes.codes.OK).json(result);


    }
    db.closeConnection(mycon);
  });
}

//Crea un nuevo usuario en nuestra BDD

function createNewUser(req,res){
  'use strict'
  var mycon= db.doConnection();
  console.log(req.body);
  var name= req.body.name,
    lastname=req.body.surname,
    email = req.body.email,
    administrador = req.body.administrador,
    password = req.body.password,
    sql;
  //Si al introducir un nuevo usuario falta algún campo, se lanzará un mensaje de error
  //y se cerrará la conexión la base de datos
  if(!name || !lastname || !email || !password){
    res.status(httpCodes.codes.BADREQUEST).json("Faltan datos")
    db.closeConnection(mycon);
  }else {
      checkUserExists(email,mycon)
      .then(function(resp){
        console.log("Error, email duplicado");
      res.status(httpCodes.codes.CONFLICT).json("duplicated email")
      })
      .catch(function(resp){
          if(resp != DBERROR){
              sql = `INSERT INTO usuarios ( name, surname, email, Administrador,password)`;
              sql += `VALUES ('${name}','${lastname}','${email}',0,'${password}')`;
              //console.log("New User Inserction");
              mycon.query(sql,function(err,result){
                if(err){

                  res.status (httpCodes.codes.SERVERERROR).json(DBERROR);
                  db.closeConnection(mycon);

                }else{
                  let newUrl = req.url + "/" + email;
                  res.set("Location",newUrl);
                  res.status(httpCodes.codes.CREATED).end();
                  db.closeConnection(mycon);

                }
              });

          }else{
            res.status(httpCodes.codes.SERVERERROR).json(DBERROR);
            db.closeConnection(mycon);
          }
      });

  }
}
// Actualiza el nombre de un usuario en la tabla usuarios de mi BDD
function userNameUpdate(email,name,conn) {
  const NOUSER = "NON EXISTENT USER";
  const DBERROR = "DATABASE ERROR";
  var sql;
  sql = "UPDATE usuarios SET name = '"+name+"' WHERE email='"+email+"'";
  let laPromesa = new Promise(function(resolve,reject){
    conn.query(sql,function(err,result){
      if(err){
        console.log("ERROR ACTUALIZANDO NAME");
        reject(DBERROR);
      }else{
        if(result.affectedRows===0){
          console.log("No existe usuario");
          reject(NOUSER);
        }else{
          resolve(result.affectedRows);
        }

      }
    });
  });
  return laPromesa;

}
/* Actualiza el nombre del usuario pasado por req, en caso de lograrse, se devuelve una respuesta 200
sino devuelve el error correspondiente
*/

function updateNameUser(req, res) {
  'use strict';
  var name = req.body.name,
    email = req.body.email;
  if (!email || !name)
    res.status(httpCodes.codes.BADREQUEST).json("Incomplete request");
  else {
    var mycon = db.doConnection();
    checkUserExists(email, mycon)
      .then(function (resp) {
        return userNameUpdate(email, name, mycon)
      })
      .then(function (resp) {
        res.status(httpCodes.codes.OK).json("Nombre actualizado correctamente");
        db.closeConnection(mycon);
      })
      .catch(function (resp) {
        db.closeConnection(mycon);
        if (resp !== DBERROR) {
          res.status(httpCodes.codes.CONFLICT).json("No existe usuario");

        } else {
          res.status(httpCodes.codes.SERVERERROR).json(DBERROR);
        }
      });
  }
}


// Actualiza la contraseña de un usuario en la tabla usuarios de mi BDD
function userPasswordUpdate(email,password,conn) {
  const NOUSER = "NON EXISTENT USER";
  const DBERROR = "DATABASE ERROR";
  var sql;
  sql = "UPDATE usuarios SET password = '"+password+"' WHERE email='"+email+"'";
  let laPromesa = new Promise(function(resolve,reject){
    conn.query(sql,function(err,result){
      if(err){
        console.log("ERROR ACTUALIZANDO CONTRASEÑA");
        reject(DBERROR);
      }else{
        if(result.affectedRows===0){
          console.log("No existe usuario");
          reject(NOUSER);
        }else{
          resolve(result.affectedRows);
        }

      }
    });
  });
  return laPromesa;

}

/* Actualiza el apellido del usuario pasado por req, en caso de lograrse, se devuelve una respuesta 200
sino devuelve el error correspondiente
*/
function updatePasswordUser(req, res) {
  'use strict';
  var password = req.body.password,
    email = req.body.email;
  if (!email || !password)
    res.status(httpCodes.codes.BADREQUEST).json("Incomplete request");
  else {
    var mycon = db.doConnection();
    checkUserExists(email, mycon)
      .then(function (resp) {
        return userPasswordUpdate(email, password, mycon);
      })
      .then(function (resp) {
        res.status(httpCodes.codes.OK).json("Password actualizada correctamente");
        db.closeConnection(mycon);
      })
      .catch(function (resp) {
        db.closeConnection(mycon);
        if (resp !== DBERROR) {
          res.status(httpCodes.codes.CONFLICT).json("No existe usuario");

        } else {
          res.status(httpCodes.codes.SERVERERROR).json(DBERROR);
        }
      });
  }
}


// Actualiza el apellido de un usuario en la tabla usuarios de mi BDD

function userSurnameUpdate(email,surname,conn) {
  const NOUSER = "NON EXISTENT USER";
  const DBERROR = "DATABASE ERROR";
  var sql;
  sql = "UPDATE usuarios SET surname = '"+surname+"' WHERE email='"+email+"'";
  let laPromesa = new Promise(function(resolve,reject){
    conn.query(sql,function(err,result){
      if(err){
        console.log("ERROR ACTUALIZANDO APELLIDO");
        reject(DBERROR);
      }else{
        if(result.affectedRows===0){
          console.log("No existe usuario");
          reject(NOUSER);
        }else{
          resolve(result.affectedRows);
        }

      }
    });
  });
  return laPromesa;

}

/* Actualiza el apellido del usuario pasado por req, en caso de lograrse, se devuelve una respuesta 200
sino devuelve el error correspondiente
*/
function updateSurnameUser(req, res) {
  'use strict';
  var surname = req.body.surname,
    email = req.body.email;
  if (!email || !surname)
    res.status(httpCodes.codes.BADREQUEST).json("Incomplete request");
  else {
    var mycon = db.doConnection();
    checkUserExists(email, mycon)
      .then(function (resp) {
        return userSurnameUpdate(email, surname, mycon)
      })
      .then(function (resp) {
        res.status(httpCodes.codes.OK).json("Apellido actualizado correctamente");
        db.closeConnection(mycon);
      })
      .catch(function (resp) {
        db.closeConnection(mycon);
        if (resp !== DBERROR) {
          res.status(httpCodes.codes.CONFLICT).json("No existe usuario");

        } else {
          res.status(httpCodes.codes.SERVERERROR).json(DBERROR);
        }
      });
  }
}


//Elimina el usuario pasado por parámetro
function deleteUser(req,res){
  'use strict'
  var mycon = db.doConnection();
  var email= req.body.email,
    sql;
  checkUserExists(email,mycon)
    .then(function(resp){
          sql="DELETE FROM usuarios WHERE email='"+email+"'";
          mycon.query(sql,function(err,result){
            if(err)
              res.status(httpCodes.codes.SERVERERROR).json(DBERROR);
            else{
              res.status(httpCodes.codes.NOCONTENT).end();
            }
            db.closeConnection(mycon);
          });
    })
    .catch(function(resp){
      if(resp!==DBERROR){
        res.status(httpCodes.codes.NOTFOUND).json(resp);
      }else{
        res.status(httpCodes.codes.SERVERERROR).json(resp);
      }
      db.closeConnection(mycon);
    });

}
/*Comprueba que el usuario en body req existe llamando a la checkLogin()
en caso de existir devuelve el usuario y un token, en caso de que no devuelve un mensaje de error
*/
function checkAuthorization(req,res){
  'use strict'
  var mycon = db.doConnection();
  console.log(req.body);
  var email = req.body.email,
    password = req.body.password;

  if(!email || !password) {
    res.status(httpCodes.codes.BADREQUEST).json("Incomplete request");
    db.closeConnection(mycon);
  }else{

    checkLogIn(email,password,mycon)
      .then(function (resp){
        console.log("Individual user auth for:"+email);
        const token = jwt.sign({email:'email'},'secretKey');
        res.set('Authorization',token);
        res.status(httpCodes.codes.OK).json(resp);
        console.log("paso por aqui");
        //res.json(resp).string;
        db.closeConnection(mycon);
      })
      .catch(function(resp){
        if(resp!==DBERROR){
          res.status(httpCodes.codes.NOTFOUND).json(resp);

        }else{
          res.status(httpCodes.codes.SERVERERROR).json(resp);

        }
        db.closeConnection(mycon);
      });
  }

}
// Comprueba en la base de datos que los parametros email y password le pertenecen a algun usuario
function checkLogIn(email, password, conn) {
  const NOUSER = "NON EXISTENT USER";
  var sql;
  sql = "SELECT * FROM  usuarios WHERE email = ? AND password = ?";
  console.log("SQL query:", sql, email, password); // Imprimir la consulta SQL
  let laPromesa = new Promise(function (resolve, reject) {
    conn.query(sql, [email, password], function (err, result) {
      if (err) {
        console.log("Error en la consulta: " + err.message);
        reject(DBERROR);
      } else {
        if (result.length === 1 )
          resolve(result[0]);
        else
          reject(NOUSER);
      }
    });
  }).finally(() => {
    conn.end(); // cerrar la conexión de la base de datos
  });
  return laPromesa;
}




exports.listUsers=listUsers;
exports.deleteUser=deleteUser;
exports.updateNameUser=updateNameUser;
exports.createNewUser=createNewUser;
exports.checkAuthorization=checkAuthorization;
exports.updateSurnameUser=updateSurnameUser;
exports.updatePasswordUser=updatePasswordUser;
