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
  testService(){
    return 'Probando el servicio de angular';
  }
  saveUser(user:User){
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content type','application/json');
    return this._http.post(this.url+'/usuario',params,{headers:headers});
  }
}
