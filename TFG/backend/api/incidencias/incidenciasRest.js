var httpCodes = require ('../http/httpCodes'),
  db = require ('../database/dbManage');
const DBERROR = "Database Server Error";

function checkIncidenciaExists(Userid,conn){
  const NOPROD = "non existent robot";
  var sql;
  sql = "SELECT Idincidencia, Userid FROM  incidencias WHERE Userid ='"+Userid+"'";

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
  var sql = "Select Idincidencia, Userid,Nombre, Description, Fecha FROM incidencias";

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
  var mycon = db.doConnection();
  var sql = "Select Idincidencia, Userid,Nombre, Description, Fecha FROM incidencias where Userid='"+Userid+"'";

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
  var mycon= db.doConnection();

  var Userid= req.body.Userid,
    Nombre = req.body.Nombre,
    Description = req.body.Description,
    sql;

  if(!Userid || !Description || !Nombre){
    res.status(httpCodes.codes.BADREQUEST).json("Faltan datos")
    db.closeConnection(mycon);
  }else{
          sql = `INSERT INTO incidencias ( Userid, Nombre, Description)`;
          sql += `VALUES ('${Userid}','${Nombre}','${Description}')`;
          mycon.query(sql,function(err,result){
            if(err){

              res.status (httpCodes.codes.SERVERERROR).json(DBERROR);
              db.closeConnection(mycon);

            }else{
              res.status(httpCodes.codes.CREATED).end();
              db.closeConnection(mycon);

            }
          });

  }
}
