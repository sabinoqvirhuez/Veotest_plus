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
  /*
  loginUser(user: User) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify(user);
    return this._http.post(this.url + '/iniciarSesion', body, { headers });
  }


   */
  loginUser(user: User): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify(user);

    return this._http.post(this.url + '/iniciarSesion', body, {
      headers,
      observe: 'response' // Aquí se especifica que se desea observar la respuesta completa
    });
  }

  listUsers() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get<User[]>(this.url + '/usuario', { headers });
  }



}
