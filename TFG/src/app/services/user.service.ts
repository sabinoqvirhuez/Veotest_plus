import { Injectable} from "@angular/core";
import {HttpClient, HttpHeaders,HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from '../models/user';
import {Global} from './global';
import { tap } from 'rxjs/operators';



@Injectable()
export class UserService{
  private url:string;


  constructor(
    private _http:HttpClient
  ) {
    this.url=Global.url;
  }
  //Metodo que se conecta con el Backend mediante una peticion post para crear un nuevo usuario
  saveUser(user:User){

    let headers = new HttpHeaders().set('Content-type','application/json');
    return this._http.post(this.url+'/usuario',user,{headers:headers});


  }
  //Metodo que se conecta con el Backend mediante una peticion post para iniciar Sesión con
  //una cuenta existente

  loginUser(user: User): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify(user);

    return this._http.post(this.url + '/iniciarSesion', body, {
      headers,
      observe: 'response' // Aquí se especifica que se desea observar la respuesta completa
    });
  }

  showUser(idp:number):Observable<User[]>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const idaux=JSON.stringify({id: idp});


    return this._http.post<User[]>(this.url + '/profile', idaux,{ headers});

  }




  newName(user: User): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify(user);

    return this._http.post(this.url + '/iniciarSesion', body, {
      headers,
      observe: 'response' // Aquí se especifica que se desea observar la respuesta completa
    });
  }


  newSurname(user: User): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify(user);

    return this._http.post(this.url + '/iniciarSesion', body, {
      headers,
      observe: 'response' // Aquí se especifica que se desea observar la respuesta completa
    });
  }

  newPassword(user: User): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify(user);

    return this._http.post(this.url + '/iniciarSesion', body, {
      headers,
      observe: 'response' // Aquí se especifica que se desea observar la respuesta completa
    });
  }

  deleteUser(user: User): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify(user);

    return this._http.post(this.url + '/eliminarUsuario', body, {
      headers,
      observe: 'response' // Aquí se especifica que se desea observar la respuesta completa
    });
  }




//Metodo que mediante una petición get obtiene un array de usuarios del backend
  listUsers() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get<User[]>(this.url + '/usuario', { headers });
  }
//Metodo para comprobar que un usuario está logeado, si lo está devuelve true, sino False
  loggedIn(){
    if(sessionStorage.getItem('token')){
      return true;
    }else{
      return false;
    }
  }
  //Metodo que obtiene el token de un session Storage, en caso de haberlo
  getToken(){
    return sessionStorage.getItem('token');
  }
//Metodo que borra el token e IdUsuario del sessionStorage
  deleteToken(){


    sessionStorage.removeItem('token');
    sessionStorage.removeItem('Userid');

  }



}
