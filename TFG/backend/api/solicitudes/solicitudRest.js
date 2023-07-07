var httpCodes = require ('../http/httpCodes'),
  db = require ('../database/dbManage');
const {exec} = require("child_process");
const DBERROR = "Database Server Error";


function createNewSolicitud(req,res){
  'use strict'
  var mycon= db.doConnection();

  var Userid= req.body.Userid,
    name=req.body.name,
    sql;
  if(!name ){
    res.status(httpCodes.codes.BADREQUEST).json("Faltan datos")
    db.closeConnection(mycon);
  }else{
    checkRobotExists(name, mycon)
      .then((result) => {
        const Robotid = result.Robotid;
        sql = `INSERT INTO solicitudes ( Userid, Robotid,Estado)`;
        sql += `VALUES ('${Userid}','${Robotid}',0)`;
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
      res.status(httpCodes.codes.CONFLICT).json(error);
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

  console.log(Userid,Robotid,Estado);

  if (!Userid || !Robotid || Estado<0 || Estado >4 || !Estado)
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
  var sql = "Select solicitudes.Userid, robots.name as name, usuarios.name as uname, usuarios.surname as usurname, solicitudes.Robotid,Fecha, Estado FROM solicitudes Join robots on solicitudes.Robotid= robots.Robotid join usuarios on solicitudes.Userid= usuarios.Userid";

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
  var sql = "Select name, Fecha, Estado FROM solicitudes Join robots on solicitudes.Robotid= robots.Robotid WHERE Userid ='"+Userid+"'";

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


function darAcceso(req, res) {
  'use strict';
  let rid = req.body.Robotid,
    uid = req.body.Userid;
  var mycon = db.doConnection();

  if(rid==null || uid==null){
    res.status(httpCodes.codes.BADREQUEST).json("Incomplete request");
  }else{
    accesoPromise(rid, uid, mycon)
      .then(function (result) {
        let nombreRobot = result.name.substring(8);
        let clave = result.Clave;

        console.log("Nombre del robot:", nombreRobot);
        console.log("Clave:", clave);

        provideAcceso(nombreRobot, clave)
          .then(function (result) {
            console.log("Acceso concedido");
            res.status(httpCodes.codes.OK).json("Acceso concedido");
          })
          .catch(function (err) {
            console.error(err);
            res.status(httpCodes.codes.CONFLICT).json("Error al conceder acceso");
          });

        db.closeConnection(mycon);
      })
      .catch(function (error) {
        console.error(error);
        db.closeConnection(mycon);
        res.status(httpCodes.codes.SERVERERROR).json("Error al obtener acceso");
      });
  }
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

function provideAcceso(Robotid, Clave) {
  const { exec } = require('child_process');

  return new Promise((resolve, reject) => {
    const encodedClave = encodeURIComponent(`"${Clave}"`);
    const cmd = `curl -X POST "http://10.96.0.71:8080/job/JOB_ANS_011_PROVIDE_ACCESS/buildWithParameters?TARGET_HOST=${Robotid}&USER_PKEY=${encodedClave}" --user uservideo:1191a844371d1d85652e94017fce9f8f6e`;

    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error al ejecutar los comandos: ${error}`);
        reject(error);
      } else {
        console.log(`Resultado: ${stdout}`);
        resolve("Proceso ejecutado correctamente");
      }
    });
  });
}

function revokeAcceso(Robotid, Clave) {
  const { exec } = require('child_process');

  return new Promise((resolve, reject) => {
    const encodedClave = encodeURIComponent(`"${Clave}"`);
    const cmd = `curl -X POST "http://10.96.0.71:8080/job/JOB_ANS_009_REVOKE_ACCESS/buildWithParameters?TARGET_HOST=${Robotid}&USER_PKEY=${encodedClave}" --user uservideo:1191a844371d1d85652e94017fce9f8f6e`;

    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error al ejecutar los comandos: ${error}`);
        reject(error);
      } else {
        console.log(`Resultado: ${stdout}`);
        resolve("Proceso ejecutado correctamente");
      }
    });
  });
}


function quitarAcceso(req, res) {
  'use strict';
  let rid = req.body.Robotid,
    uid = req.body.Userid;

  var mycon = db.doConnection();

  if(rid==null||uid==null) {

    res.status(httpCodes.codes.BADREQUEST).json("Incomplete request");
  }else {
    accesoPromise(rid, uid, mycon)
      .then(function (result) {
        let nombreRobot = result.name.substring(8);
        let clave = result.Clave;

        console.log("Nombre del robot:", nombreRobot);
        console.log("Clave:", clave);

        revokeAcceso(nombreRobot, clave)
          .then(function (result) {
            console.log("Acceso revocado");
            res.status(httpCodes.codes.OK).json("Acceso revocado");

          })
          .catch(function (err) {
            console.error(err);
            res.status(httpCodes.codes.CONFLICT).json("Error al revocar acceso");
          });

        db.closeConnection(mycon);
      })
      .catch(function (error) {
        console.error(error);
        db.closeConnection(mycon);
        res.status(httpCodes.codes.SERVERERROR).json("Error al revocar acceso");
      });
  }
}


exports.createNewSolicitud=createNewSolicitud;
exports.deleteSolicitud=deleteSolicitud;
exports.updateEstadoSolicitud=updateEstadoSolicitud;
exports.listSolicitudes=listSolicitudes;
exports.listMySolicitudes=listMySolicitudes;
exports.darAcceso=darAcceso;
exports.quitarAcceso=quitarAcceso;
