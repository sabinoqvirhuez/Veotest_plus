const{ json,response} = require('express');

var httpCodes = require ('../http/httpCodes'),
  db = require ('../database/dbManage');

const DBERROR = "Database Server Error";
function checkUserExists(prodId,conn){
  const NOPROD = "non existent user id";
  var sql;
  sql = "SELECT Userid, Nombre, Apellido, Email, Administrador FROM  usuarios WHERE Userid ='"+Userid+"'";

  let laPromesa = new Promise (function(resolve,reject){
    conn.query(sql,function(resolve,reject){
      if (err){
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
  var sql = "Select Userid, Nombre, Apellido, Email, Administrador FROM usuarios";
  console.log("User global search");
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
  var userId= req.body.userId,
    name= req.body.name,
    lastname=req.body.surname,
    email = req.body.email,
    administrador = req.body.administrador,
    sql;
  //Si al introducir un nuevo usuario falta algún campo, se lanzará un mensaje de error
  //y se cerrará la conexión la base de datos
  if(!userId){
    res.status(httpCode.codes.BADREQUEST).json("no user id")
    db.closeConnection(mycon);
  }else if(!name){
    res.status(httpCode.codes.BADREQUEST).json("no user name")
    db.closeConnection(mycon);
  }else if(!lastname){
    res.status(httpCode.codes.BADREQUEST).json("no user lastname")
    db.closeConnection(mycon);
  }else if(!email){
    res.status(httpCode.codes.BADREQUEST).json("no user email")
    db.closeConnection(mycon);
  }else if(!administrador){
    res.status(httpCode.codes.BADREQUEST).json("no user type")
    db.closeConnection(mycon);
  }else {
      checkProductExists(userId,mycon)
      .then(function(resp){
      res.status(httpCodes.codes.CONFLICT).json("duplicated user id")
      })
      .catch(function(resp){
          if(resp != DBERROR){
              sql = `INSER INTO usuarios (UserId, Nombre, Apellido, Email, Administrador)`;
              sql += `VALUES ('${userId}','${name}','${lastname}','${email}','${administrador}')`;
              //console.log("New User Inserction");
              mycon.query(sql,function(err,result){
                if(err){
                  res.status (httpCodes.codes.SERVERERROR).json(DBERROR);
                  db.closeConnection(mycon);

                }else{
                  let newUrl = req.url + "/" + userId;
                  res.set("Location",newUrl);
                  res.status(httCodes.codes.CREATED).end();
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

function updateUser(req,res){
  'use strict';
  var userId= req.body.userId,
    name= req.body.name,
    lastname=req.body.surname,
    email = req.body.email,
    administrador = req.body.boolean,
    sql;
  if(!userId)
    res.status (httpCodes.codes.BADREQUEST).end();
  else{
    var mycon = db.doConnection();
    sql = "SELECT UserId FROM usuarios WHERE UserId = '"+userId+"'";
    mycon.query(sql,function(err,result){
        if(err){
          res.status(htttpCodes.codes.SERVERERROR).end();
          db.closeConnection(mycon);
        }else{
            if(result.length==0){
              res.status(httpCodes.codes.OK).json("non existent user id");
            }else{
              valueUpdate(mycon,res,userId,name,lastname,email,administrador);
            }
        }

    })
  }
}

function deleteUser(req,res){
  'use strict'
  var mycon = db.doConnection();
  var userId= req.params.userId,
    sql;
  checkUsersExists(userId,mycon)
    .then(function(resp){
          sql="DELETE FROM usuarios WHERE UserId='"+userId+"'";
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
exports.listUsers=listUsers;
exports.deleteUser=deleteUser;
exports.updateUser=updateUser;
exports.createNewUser=createNewUser;

