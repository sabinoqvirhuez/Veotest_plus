var httpCodes = require ('../http/httpCodes'),
  db = require ('../database/dbManage');
const DBERROR = "Database Server Error";

function checkIncidenciaExists(Idincidencia,Userid,conn){
  const NOPROD = "non existent robot";
  var sql;
  sql = "SELECT Idincidencia, Userid FROM  incidencias WHERE Idincidencia ='"+Idincidencia+"' and Userid='"+Userid+"' ";

  let laPromesa = new Promise (function(resolve,reject){
    conn.query(sql,function(err,result){
      if (err){
        console.log("Error,solicitud duplicada")
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

function listIncidencias(req,res){
  'use strict';
  var mycon = db.doConnection();
  let sql = "SELECT usuarios.name, usuarios.surname, incidencias.Idincidencia,incidencias.Userid , incidencias.Nombre, Description, Fecha FROM veotest.incidencias JOIN veotest.usuarios on usuarios.Userid=incidencias.Userid";

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

function listMyIncidencias(req,res){
  'use strict';
  let Userid= req.params.id;
  let mycon = db.doConnection();
  let sql = "SELECT usuarios.name, usuarios.surname, incidencias.Idincidencia,incidencias.Userid , incidencias.Nombre, Description, Fecha FROM veotest.incidencias JOIN veotest.usuarios on usuarios.Userid=incidencias.Userid where  incidencias.Userid='"+Userid+"'";

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

function createNewIncidencia(req,res){
  'use strict'

  const DBERROR = "Database Server Error";
  let mycon= db.doConnection();
  var Userid= req.body.Userid,
    Nombre = req.body.Nombre,
    Description = req.body.Description,
    sql;
  if(Userid ==null || !Description || !Nombre){
    res.status(httpCodes.codes.BADREQUEST).json("Faltan datos")
    db.closeConnection(mycon);
  }else{
          sql = `INSERT INTO incidencias ( Userid, Nombre, Description)`;
          sql += `VALUES ('${Userid}','${Nombre}','${Description}')`;
          mycon.query(sql,function(err,result){
            if(err){
              console.log(err);
              res.status (httpCodes.codes.SERVERERROR).json(DBERROR);
              db.closeConnection(mycon);
            }else{
              res.status(httpCodes.codes.CREATED).end();
              db.closeConnection(mycon);
            }
          });
  }
}

function deleteIncidencia(req,res){
  'use strict'
  let mycon = db.doConnection();
  let id= req.params.id,
    Userid=req.params.userid,
    sql;
  checkIncidenciaExists(id,Userid,mycon)
    .then(function(resp){
      sql="DELETE FROM incidencias WHERE Idincidencia='"+id+"' and Userid= '"+Userid+"' ";
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

function incidenciaDescriptionPromise(id,description,Userid,conn) {
  const NOUSER = "NON EXISTENT ROBOT";
  const DBERROR = "DATABASE ERROR";
  let sql;
  sql = "UPDATE incidencias SET Description = '"+description+"' WHERE Idincidencia='"+id+"' and Userid= '"+Userid+"'";
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

function updateDescriptionIncidencia(req, res) {
  'use strict';
  let Idincidencia = req.body.Idincidencia,
    Userid= req.body.Userid,
    Description = req.body.Description;
  if (Idincidencia == null || !Description || !Userid)
    res.status(httpCodes.codes.BADREQUEST).json("Incomplete request");
  else {
    var mycon = db.doConnection();
    checkIncidenciaExists(Idincidencia,Userid,mycon)
      .then(function (resp) {
        return incidenciaDescriptionPromise(Idincidencia, Description,Userid, mycon)
      })
      .then(function (resp) {
        res.status(httpCodes.codes.OK).json("Description de la incidencia actualizada correctamente");
        db.closeConnection(mycon);
      })
      .catch(function (resp) {
        db.closeConnection(mycon);
        if (resp !== DBERROR) {
          res.status(httpCodes.codes.CONFLICT).json("No existe la incidencia");
        } else {
          res.status(httpCodes.codes.SERVERERROR).json(DBERROR);
        }
      });
  }
}


function listOneIncidencias(req,res){
  'use strict';
  let Userid= req.params.id;
  let Idincidencia = req.params.indexid;
  let mycon = db.doConnection();
  let sql = "SELECT usuarios.name, usuarios.surname, incidencias.Idincidencia,incidencias.Userid , incidencias.Nombre, Description, Fecha FROM veotest.incidencias JOIN veotest.usuarios on usuarios.Userid=incidencias.Userid where  incidencias.Userid='"+Userid+"' and incidencias.Idincidencia='"+Idincidencia+"'";

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

exports.updateDescriptionIncidencia= updateDescriptionIncidencia;
exports.deleteIncidencia=deleteIncidencia;
exports.createNewIncidencia=createNewIncidencia;
exports.listMyIncidencias=listMyIncidencias;
exports.listIncidencias=listIncidencias;
exports.listOneIncidencias=listOneIncidencias;
