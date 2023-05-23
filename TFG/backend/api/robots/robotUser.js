const jwt = require ('jsonwebtoken');
var httpCodes = require ('../http/httpCodes'),
  db = require ('../database/dbManage');
const {catchError} = require("rxjs");
const DBERROR = "Database Server Error";

//Comprueba que el robot existe y devuelve sus datos, sino da error
function checkRobotExists(name,conn){
  const NOPROD = "non existent robot";
  var sql;
  sql = "SELECT name FROM  robots WHERE name ='"+name+"'";

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

//Devuelve todos los robots existentes
function listRobots(req,res){
  'use strict';
  var mycon = db.doConnection();
  var sql = "Select name FROM robots";

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

function createNewRobot(req,res){
  'use strict'
  var mycon= db.doConnection();

  var name= req.body.name,
    description = req.body.description,
    dispositivo = req.body.dispositivo,
    direccion = req.body.direccion,
    disponible = req.body.disponible,
    sql;

  if(!name || !description || !dispositivo || !direccion || !disponible){
    res.status(httpCodes.codes.BADREQUEST).json("Faltan datos")
    db.closeConnection(mycon);
  }else{

    checkRobotExists(name,mycon)
      .then(function(resp){
        console.log("Error, nombre duplicado");
        res.status(httpCodes.codes.CONFLICT).json("duplicated name")
      })
      .catch(function(resp){
        if(resp != DBERROR){
          sql = `INSERT INTO robots ( name, description, dispositivo, direccion, disponible)`;
          sql += `VALUES ('${name}','${description}','${dispositivo}','${direccion}','${disponible}')`;
          mycon.query(sql,function(err,result){
            if(err){

              res.status (httpCodes.codes.SERVERERROR).json(DBERROR);
              db.closeConnection(mycon);

            }else{
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

function deleteRobot(req,res){
  'use strict'
  var mycon = db.doConnection();
  var name= req.params.name,
    sql;

  checkRobotExists(name,mycon)
    .then(function(resp){
      sql="DELETE FROM robots WHERE name='"+name+"'";
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

function robotDescriptionPromise(name,description,conn) {
  const NOUSER = "NON EXISTENT ROBOT";
  const DBERROR = "DATABASE ERROR";
  var sql;
  sql = "UPDATE robots SET description = '"+description+"' WHERE name='"+name+"'";
  let laPromesa = new Promise(function(resolve,reject){
    conn.query(sql,function(err,result){
      if(err){
        console.log("ERROR ACTUALIZANDO DESCRIPTION");
        reject(DBERROR);
      }else{
        if(result.affectedRows===0){
          console.log("No existe robot");
          reject(NOUSER);
        }else{
          resolve(result.affectedRows);
        }

      }
    });
  });
  return laPromesa;

}

function updateDescriptionRobot(req, res) {
  'use strict';
  var name = req.body.name,
    description = req.body.description;
  if (!name || !description)
    res.status(httpCodes.codes.BADREQUEST).json("Incomplete request");
  else {
    var mycon = db.doConnection();
    checkRobotExists(name, mycon)
      .then(function (resp) {
        return robotDescriptionPromise(name, description, mycon)
      })
      .then(function (resp) {
        res.status(httpCodes.codes.OK).json("Descripcion del robot actualizado correctamente");
        db.closeConnection(mycon);
      })
      .catch(function (resp) {
        db.closeConnection(mycon);
        if (resp !== DBERROR) {
          res.status(httpCodes.codes.CONFLICT).json("No existe robot");

        } else {
          res.status(httpCodes.codes.SERVERERROR).json(DBERROR);
        }
      });
  }
}

function updateDispositivoRobot(req, res) {
  'use strict';
  var name = req.body.name,
    dispositivo = req.body.dispositivo;
  if (!name || !dispositivo)
    res.status(httpCodes.codes.BADREQUEST).json("Incomplete request");
  else {
    var mycon = db.doConnection();
    checkRobotExists(name, mycon)
      .then(function (resp) {
        return robotDispositivoPromise(name, dispositivo, mycon)
      })
      .then(function (resp) {
        res.status(httpCodes.codes.OK).json("Dispositivo del robot actualizado correctamente");
        db.closeConnection(mycon);
      })
      .catch(function (resp) {
        db.closeConnection(mycon);
        if (resp !== DBERROR) {
          res.status(httpCodes.codes.CONFLICT).json("No existe robot");

        } else {
          res.status(httpCodes.codes.SERVERERROR).json(DBERROR);
        }
      });
  }
}

function robotDispositivoPromise(name,description,conn) {
  const NOUSER = "NON EXISTENT ROBOT";
  const DBERROR = "DATABASE ERROR";
  var sql;
  sql = "UPDATE robots SET dispositivo = '"+description+"' WHERE name='"+name+"'";
  let laPromesa = new Promise(function(resolve,reject){
    conn.query(sql,function(err,result){
      if(err){
        console.log("ERROR ACTUALIZANDO DISPOSITIVO");
        reject(DBERROR);
      }else{
        if(result.affectedRows===0){
          console.log("No existe robot");
          reject(NOUSER);
        }else{
          resolve(result.affectedRows);
        }

      }
    });
  });
  return laPromesa;

}

function updateDireccionRobot(req, res) {
  'use strict';
  var name = req.body.name,
    direccion = req.body.direccion;
  if (!name || !direccion)
    res.status(httpCodes.codes.BADREQUEST).json("Incomplete request");
  else {
    var mycon = db.doConnection();
    checkRobotExists(name, mycon)
      .then(function (resp) {
        return robotDireccionPromise(name, direccion, mycon)
      })
      .then(function (resp) {
        res.status(httpCodes.codes.OK).json("Direccion del robot actualizado correctamente");
        db.closeConnection(mycon);
      })
      .catch(function (resp) {
        db.closeConnection(mycon);
        if (resp !== DBERROR) {
          res.status(httpCodes.codes.CONFLICT).json("No existe robot");

        } else {
          res.status(httpCodes.codes.SERVERERROR).json(DBERROR);
        }
      });
  }
}

function robotDireccionPromise(name,direccion,conn) {
  const NOUSER = "NON EXISTENT ROBOT";
  const DBERROR = "DATABASE ERROR";
  var sql;
  sql = "UPDATE robots SET direccion = '"+direccion+"' WHERE name='"+name+"'";
  let laPromesa = new Promise(function(resolve,reject){
    conn.query(sql,function(err,result){
      if(err){
        console.log("ERROR ACTUALIZANDO DIRECCION");
        reject(DBERROR);
      }else{
        if(result.affectedRows===0){
          console.log("No existe robot");
          reject(NOUSER);
        }else{
          resolve(result.affectedRows);
        }

      }
    });
  });
  return laPromesa;

}
function updateDisponibleRobot(req, res) {
  'use strict';
  var name = req.body.name,
    direccion = req.body.disponible;
  if (!name || direccion==null)
    res.status(httpCodes.codes.BADREQUEST).json("Incomplete request");
  else {
    var mycon = db.doConnection();
    checkRobotExists(name, mycon)
      .then(function (resp) {
        return robotDisponiblePromise(name, direccion, mycon)
      })
      .then(function (resp) {
        res.status(httpCodes.codes.OK).json("Disponibilidad del robot actualizada correctamente");
        db.closeConnection(mycon);
      })
      .catch(function (resp) {
        db.closeConnection(mycon);
        if (resp !== DBERROR) {
          res.status(httpCodes.codes.CONFLICT).json("Disponible debe de ser de tipo entero");

        } else {
          res.status(httpCodes.codes.SERVERERROR).json(DBERROR);
        }
      });
  }
}
function robotDisponiblePromise(name,disponible,conn) {
  const NOUSER = "NON EXISTENT ROBOT";
  const DBERROR = "DATABASE ERROR";
  var sql;
  sql = "UPDATE robots SET disponible = ? WHERE name = ?";

  let laPromesa = new Promise(function(resolve, reject) {
    conn.query(sql, [disponible, name], function(err, result) {
      if (err) {
        console.log("ERROR ACTUALIZANDO DISPONIBLE");
        reject(DBERROR);
      } else {
        if (result.affectedRows === 0) {
          console.log("No existe robot");
          reject(NOUSER);
        } else {
          resolve(result.affectedRows);
        }
      }
    });
  });

  return laPromesa;

}

function showRobot(req,res){
  'use strict';
  var name= req.params.name;
  var mycon = db.doConnection();
  var sql = "SELECT name FROM  robots WHERE name ='"+name+"'";
  mycon.query(sql, function (err, result) {
    if (err) {
      console.log(err);
      res.status(httpCodes.codes.SERVERERROR).json(DBERROR);
    } else {
      if (result.length === 0) {
        res.status(httpCodes.codes.NOTFOUND).json({ error: 'Robot not found' });
      } else {
        res.status(httpCodes.codes.OK).json(result);
      }
    }
    db.closeConnection(mycon);
  });
}

exports.showRobot=showRobot;
exports.updateDisponibleRobot=updateDisponibleRobot;
exports.updateDireccionRobot=updateDireccionRobot;
exports.updateDispositivoRobot=updateDispositivoRobot;
exports.updateDescriptionRobot=updateDescriptionRobot;
exports.deleteRobot=deleteRobot;
exports.createNewRobot=createNewRobot;
exports.listRobots=listRobots;
