const{response} = require('express');

var httpCodes = require ('../http/httpCodes'),
  db = require ('../database/dbManage');

const DBERROR = "Database Server Error";
function checkUserExists(email,conn){
  const NOPROD = "non existent user";
  var sql;
  sql = "SELECT * FROM  usuarios WHERE Email ='"+email+"'";

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


function listUsers(req,res){
  'use strict';
  var mycon = db.doConnection();
  var sql = "Select Userid, Nombre, Apellido, Email, Administrador, Contraseña FROM usuarios";
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

function createNewUser(req,res){
  'use strict'
  var mycon= db.doConnection();
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
              sql = `INSERT INTO usuarios ( Nombre, Apellido, Email, Administrador,Contraseña)`;
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
  sql = "UPDATE usuarios SET Nombre = '"+name+"' WHERE Email='"+email+"'";
  let laPromesa = new Promise(function(resolve,reject){
    conn.query(sql,function(err,result){
      if(err){
        console.log("ERROR ACTUALIZANDO NAME");
        reject(DBERROR);
      }else{
        if(result.affectedRows==0){
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

function updateNameUser(req,res){
  'use strict';
  var name= req.body.name,
    lastname=req.body.surname,
    password = req.body.password,
    email=req.body.email,
    sql;
  if(!email)
    res.status (httpCodes.codes.BADREQUEST).end();
  else{
    var mycon = db.doConnection();
    sql = "SELECT * FROM usuarios WHERE Email = '"+email+"'";
    mycon.query(sql,function(err,result){
        if(err){
          res.status(htttpCodes.codes.SERVERERROR).end();
          db.closeConnection(mycon);
        }else{
            if(result.length==0){
              res.status(httpCodes.codes.OK).json("non existent user with that email");
            }else{
              userNameUpdate(email,name,mycon);
              res.status(httpCodes.codes.OK).json("Nombre actualizado correctamente");
            }
        }

    })
  }
}
//Elimina el usuario pasado por parámetro
function deleteUser(req,res){
  'use strict'
  var mycon = db.doConnection();
  var email= req.params.email,
    sql;
  checkUserExists(email,mycon)
    .then(function(resp){
          sql="DELETE FROM usuarios WHERE Email='"+email+"'";
          mycon.query(sql,function(err,result){
            if(err)
              res.status(httpCodes.codes.SERVERROR).json(DBERROR);
            else{
              res.status(httpCodes.codes.NOCONTENT).end();
            }
            db.closeConnection(mycon);
          });
    })
    .catch(function(resp){
      if(resp!=DBERROR){
        res.status(httpCodes.codes.NOTFOUND).json(resp);
      }else{
        res.status(httpCodes.codes.SERVERERROR).json(resp);
      }
      db.closeConnection(mycon);
    });

}
//Comprueba que el usuario introducido en el formulario de angular existe llamando a la
//función checkLogIn
function findUser(req,res){
  'use strict'
  var mycon= db.doConnection();
  let email = req.params.email;
  let password= req.params.password;
  if(!email|| !password ){
    let errormsg="Faltan datos";
    res.status(httpCodes.codes.UNAUTHORIZED).json(errormsg);
    db.closeConnection(mycon);
  }else{
    checkLogIn(email,password,mycon)
      .then(function(resp){
        db.closeConnection(mycon);
        res.status(httpCodes.codes.OK).json(resp);
      })
      .catch(function(resp){
        db.closeConnection(mycon);
        if(resp!=DBERROR){
          res.status(httpCodes.codes.NOTFOUND).json(resp);
        }else{
          res.status(httpCodes.codes.SERVERERROR).json(resp);
        }
      });


  }
}
//Comprueba que el email y password pasadas por parámeto existen en mi BDD
function checkLogIn(email,password,conn){
  const NOUSER="NON EXISTENT USER";
  var sql;
  sql = "SELECT * FROM  usuarios WHERE Email ='"+email+"' AND Contraseña='"+password+"'";
  let laPromesa = new Promise (function(resolve,reject){
    conn.query(sql,function(err,result){
      if (err){
        console.log("No existe el usuario");
        reject (DBERROR);
      }
      else {
        if(result.length>0)
          resolve(result[0]);
        else
          reject (NOUSER);
      }

    });
  });
  return laPromesa;
}



exports.listUsers=listUsers;
exports.deleteUser=deleteUser;
exports.updateNameUser=updateNameUser;
exports.createNewUser=createNewUser;
exports.findUser=findUser;
