exports.codes = {
  "OK"            : 200, //Exito en el método GET, POST, PUT, DELETE
  "CREATED"       : 201, //Creado. Respuesta a un POST con creación.Cabecera Location con ubicación nueva
  "NOCONTENT"     : 204, //Respuesta exitosa que no devuelve información (DELETE)
  "BADREQUEST"    : 400, //Petición mal formada
  "UNAUTHORIZED"  : 401, //No autorizado
  "FORBIDDEN"     : 403,  //Autenticado pero sin permiso para la operación
  "NOTFOUND"      : 404,
  "CONFLICT"      : 409, //Existe un conflicto con el recurso (por ejemplo, ya existe). El usuario debe ser capaz de solucionarlo
  "SERVERERROR"   : 500  //Error del servidor
}
