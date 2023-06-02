var httpCodes = require ('../http/httpCodes'),
  db = require ('../database/dbManage');
const DBERROR = "Database Server Error";


function createNewSolicitud(req,res){
  'use strict'
  var mycon= db.doConnection();

  var Userid= req.body.Userid,
    name=req.body.name,
    description = req.body.description,
    sql;
  if(!name || !description){
    res.status(httpCodes.codes.BADREQUEST).json("Faltan datos")
    db.closeConnection(mycon);
  }else{
    checkRobotExists(name, mycon)
      .then((result) => {
        const Robotid = result.Robotid;
        sql = `INSERT INTO solicitudes ( Userid, Robotid, description,Estado)`;
        sql += `VALUES ('${Userid}','${Robotid}','${description}',0)`;
        mycon.query(sql, function (err, result) {
          if (err) {
            res.status(httpCodes.codes.SERVERERROR).json(DBERROR);
            db.closeConnection(mycon);
          } else {
            res.status(httpCodes.codes.CREATED).end();
            db.closeConnection(mycon);
          }
        });
      }).catch((error) => {
      console.error("Error: El robot que intentas solicitar, no existe", error);
      res.status(httpCodes.codes.NOTFOUND).json(error);
      db.closeConnection(mycon);
    });
  }
}

function checkRobotExists(name,conn){
  const NOPROD = "non existent robot";
  var sql;
  sql = "SELECT Robotid, name FROM  robots WHERE name ='"+name+"'";

  let laPromesa = new Promise (function(resolve,reject){
    conn.query(sql,function(err,result){
      if (err){
        console.log("Error, No existe el robot")
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


function deleteSolicitud(req,res){
  'use strict'
  var mycon = db.doConnection();
  let id= req.params.Robotid,
    Userid= req.params.Userid,

    sql;

  checkRobotExistsByRobotid(id,mycon)
    .then(function(resp){
      sql = 'DELETE FROM solicitudes WHERE Robotid = ? AND Userid = ?';
      mycon.query(sql,[id, Userid],function(err,result){
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

function updateEstadoSolicitud(req, res) {
  'use strict';
  var Userid = req.body.Userid,
    Robotid = req.body.Robotid,
    Estado= req.body.Estado;

  if (!Userid || !Robotid || Estado<0 || Estado >4)
    res.status(httpCodes.codes.BADREQUEST).json("Incomplete request");
  else {
    var mycon = db.doConnection();
     estadoPromise(Userid, Robotid,Estado, mycon)
      .then(function (resp) {
        res.status(httpCodes.codes.OK).json("Estado de la solicitud actualizada correctamente");
        db.closeConnection(mycon);
      })
      .catch(function (resp) {
        db.closeConnection(mycon);
        if (resp !== DBERROR) {
          res.status(httpCodes.codes.CONFLICT).json("Error al actualizar el estado de la solicitud");

        } else {
          res.status(httpCodes.codes.SERVERERROR).json(DBERROR);
        }
      });
  }
}

function estadoPromise(Userid,Robotid,Estado,conn) {
  const NOUSER = "NO EXISTE SOLICITUD";
  var sql;
  sql = "UPDATE solicitudes SET Estado = ? WHERE Userid = ? AND Robotid = ?";

  let laPromesa = new Promise(function(resolve, reject) {
    conn.query(sql, [Estado, Userid, Robotid], function(err, result) {
      if (err) {
        console.log("ERROR ACTUALIZANDO DISPONIBLE");
        reject(DBERROR);
      } else {
        if (result.affectedRows === 0) {
          console.log("No existe solicitud");
          reject(NOUSER);
        } else {
          resolve(result.affectedRows);
        }
      }
    });
  });

  return laPromesa;

}

function checkRobotExistsByRobotid(id,conn){
  const NOPROD = "non existent robot";
  var sql;
  sql = "SELECT Robotid, name FROM  robots WHERE Robotid ='"+id+"'";

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

function listSolicitudes(req,res){
  'use strict';
  var mycon = db.doConnection();
  var sql = "Select Userid, Robotid, description, Estado FROM solicitudes";

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

function listMySolicitudes(req,res){
  'use strict';
  var Userid = req.params.Userid;
  var mycon = db.doConnection();
  var sql = "Select Userid, Robotid, description, Estado FROM solicitudes WHERE Userid ='"+Userid+"'";

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


function darAcceso(req,res){
  'use strict';
  let rid= req.params.Robotid,
    uid=req.params.Userid;

  var mycon = db.doConnection();

    accesoPromise(rid, uid, mycon)
      .then(function(result) {
        // Acceder a los campos del resultado
        var nombreRobot = result.name;
        var clave = result.Clave;

        // Utilizar los campos como desees
        console.log("Nombre del robot:", nombreRobot);
        console.log("Clave:", clave);
        db.closeConnection(mycon);
      })
      .catch(function(error) {
        // Manejar el error de la promesa rechazada
        console.error(error);
        db.closeConnection(mycon);
      });

}

function accesoPromise(rid,uid,conn){
  var sql;
  sql = "Select robots.name, claves.Clave FROM solicitudes join robots on solicitudes.Robotid = robots.Robotid join usuarios on usuarios.Userid = solicitudes.Userid join claves on claves.Userid=usuarios.Userid WHERE solicitudes.Robotid='"+rid+"' and solicitudes.Userid='"+uid+"'";

  let laPromesa = new Promise (function(resolve,reject){
    conn.query(sql,function(err,result){
      if (err){
        console.log("Error")
        reject (DBERROR);
      }
      else {
        if(result.length>0)
          resolve(result[0]);
        else
          reject ("No existe solicitud");
      }

    });
  });
  return laPromesa;
}
/*
function jenkins(req,res){
  const {exec} = require('child_process');
  exec('')

}

 */

exports.createNewSolicitud=createNewSolicitud;
exports.deleteSolicitud=deleteSolicitud;
exports.updateEstadoSolicitud=updateEstadoSolicitud;
exports.listSolicitudes=listSolicitudes;
exports.listMySolicitudes=listMySolicitudes;
