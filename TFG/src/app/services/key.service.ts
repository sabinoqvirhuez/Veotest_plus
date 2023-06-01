import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Global} from "./global";
import { HttpHeaders,HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Key} from "../models/key"
import {Robot} from "../models/robot";

@Injectable({
  providedIn: 'root'
})
export class KeyService {

  private url: string;

  constructor(
    private _http: HttpClient
  ) {
    this.url = Global.url;
  }

  showKey(id: number): Observable<Key[]> {
    const url = `${this.url+'/keys'}/${id}`;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get<Key[]>(url, { headers});
  }

  removeKey(id: number): Observable<HttpResponse<any>> {

    const url= `${this.url+'/keys'}/${id}`;
    console.log("Llego hasta key service")
    return this._http.delete(url, {
      observe: 'response' // Aquí se especifica que se desea observar la respuesta completa
    });
  }

  saveKey(key:Key){
    let headers = new HttpHeaders().set('Content-type','application/json');
    return this._http.post(this.url+'/keys',key,{headers:headers});
  }
}
