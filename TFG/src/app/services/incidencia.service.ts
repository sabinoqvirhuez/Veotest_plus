import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Global} from "./global";
import { HttpHeaders,HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Incidencia} from "../models/incidencia";
import {IncidenciaAux} from "../models/incidenciaAux";
import {IncidenciaMy} from "../models/incidenciaMy";
import {Robot} from "../models/robot";

@Injectable({
  providedIn: 'root'
})
export class IncidenciaService {
  private url: string;
  constructor(
    private _http: HttpClient
  ) {
    this.url = Global.url;
  }

  showMyIncidencias(id: number): Observable<IncidenciaMy[]> {
    const url = `${this.url+'/incidencias'}/${id}`;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get<IncidenciaMy[]>(url, { headers});
  }

  showIncidencias(): Observable<IncidenciaMy[]> {
    const url = `${this.url+'/incidencias'}`;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get<IncidenciaMy[]>(url, { headers});
  }

  saveKey(aux:IncidenciaAux){
    let headers = new HttpHeaders().set('Content-type','application/json');
    return this._http.post(this.url+'/incidencias',aux,{headers:headers});
  }

  newDescription(aux: Incidencia): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify(aux);

    return this._http.put(this.url + '/incidencias', body, {
      headers,
      observe: 'response' // Aquí se especifica que se desea observar la respuesta completa
    });
  }

  deleteIncidencia(id: number, userid:number): Observable<HttpResponse<any>> {
    const url= `${this.url+'/incidencias'}/${id}/${userid}`;
    return this._http.delete(url, {
      observe: 'response' // Aquí se especifica que se desea observar la respuesta completa
    });
  }
  showOnencidencia(id: number, indexid:number): Observable<HttpResponse<IncidenciaMy[]>> {
    const url = `${this.url+'/incidenciaProfile'}/${id}/${indexid}`;
    return this._http.get<IncidenciaMy[]>(url, { observe: 'response' });
  }
}
