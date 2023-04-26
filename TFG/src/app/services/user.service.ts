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
  saveUser(user:User){

    let headers = new HttpHeaders().set('Content-type','application/json');
    return this._http.post(this.url+'/usuario',user,{headers:headers});
    /*
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-type','application/json');
    return this._http.post(this.url+'/usuario',params,{headers:headers});
    */

  }
}
