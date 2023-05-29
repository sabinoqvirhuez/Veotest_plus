var httpCodes = require ('../http/httpCodes'),
  db = require ('../database/dbManage');
const DBERROR = "Database Server Error";

function showKey(req,res){
  'use strict';
  var Userid= req.params.id;
  var mycon = db.doConnection();
  var sql = "SELECT Clave FROM  claves WHERE Userid ='"+Userid+"'";
  mycon.query(sql, function (err, result) {
    if (err) {
      console.log(err);
      res.status(httpCodes.codes.SERVERERROR).json(DBERROR);
    } else {
      if (result.length === 0) {
        res.status(httpCodes.codes.NOTFOUND).json({ error: 'Clave not found' });
      } else {
        res.status(httpCodes.codes.OK).json(result);
      }
    }
    db.closeConnection(mycon);
  });
}

function hasKey(id,conn){
  const NOPROD = "Error,Este usuario ya tiene una clave asignada";
  var sql;
  sql = "SELECT Clave FROM  claves WHERE Userid ='"+id+"'";

  let laPromesa = new Promise (function(resolve,reject){
    conn.query(sql,function(err,result){
      if (err){
        console.log("Error, en la consulta")
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

function createNewKey(req,res){
  'use strict'
  var mycon= db.doConnection();

  var id= req.body.id,
    clave = req.body.clave,
    sql;

  if(!id || !clave){
    res.status(httpCodes.codes.BADREQUEST).json("Faltan datos")
    db.closeConnection(mycon);
  }else{

    hasKey(id,mycon)
      .then(function(resp){
        console.log("Error, Este usuario ya tiene clave");
        res.status(httpCodes.codes.CONFLICT).json("Este usuario ya tiene clave")
      })
      .catch(function(resp){
        if(resp != DBERROR){
          sql = `INSERT INTO claves ( Userid, Clave)`;
          sql += `VALUES ('${id}','${clave}')`;
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

function deleteKey(req,res){
  'use strict'
  var mycon = db.doConnection();
  var id= req.params.id,
    sql;

  hasKey(id,mycon)
    .then(function(resp){
      sql="DELETE FROM claves WHERE Userid='"+id+"'";
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


exports.deleteKey=deleteKey;
exports.createNewKey=createNewKey;
exports.showKey=showKey;
