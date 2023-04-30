import { Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from '../models/user';
import {Global} from './global';

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

  loginUser(user:User){
    let headers = new HttpHeaders().set('Content-type','applicaction/json');
    return this._http.post(this.url+'/iniciarSesion',user,{headers:headers});
  }
}
