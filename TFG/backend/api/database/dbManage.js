var mysql = require('mysql'),
  connData= require('./connectionData');
const DBERROR= "Database Server Error";

exports.doConnection=function(){
  var con = mysql.createConnection({
    host: connData.connectionData.host,
    port:connData.connectionData.port,
    user: connData.connectionData.user,
    password: connData.connectionData.password,
    database: connData.connectionData.database


  });

  con.on('error',function(err){
    console.log(DBERROR);
  })
  return con;


}
exports.closeConnection = function (con){
  con.end(function(err){});
  //console.log("Database connection closed");
}



