import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders,HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Global} from "./global";
import {Solicitud} from "../models/solicitud";
import {SolicitudAux} from "../models/solicitudAux";




@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  private url:string;

  constructor(private _http:HttpClient) {
    this.url=Global.url;
  }

  listSolicitudes() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get<Solicitud[]>(this.url + '/solicitudes', { headers });
  }
  listOneSolicitud(id: number): Observable<Solicitud[]> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = `${this.url+'/solicitudes'}/${id}`;
    return this._http.get<Solicitud[]>(url, { headers });
  }

  //Hacer otro modelo de solicitud
  saveSolicitud(solicitud:SolicitudAux){
    let headers = new HttpHeaders().set('Content-type','application/json');
    return this._http.post(this.url+'/solicitudes',solicitud,{headers:headers});
  }

  removeSolicitud(Robotid: number,Userid:number): Observable<HttpResponse<any>> {
    const url= `${this.url+'/solicitudes'}/${Robotid}/${Userid}`;
    return this._http.delete(url, {
      observe: 'response' // Aquí se especifica que se desea observar la respuesta completa
    });
  }

  newEstado(solicitud: Solicitud): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify(solicitud);

    return this._http.put(this.url + '/solicitudes', body, {
      headers,
      observe: 'response' // Aquí se especifica que se desea observar la respuesta completa
    });
  }

  provideSolicitud(solicitud: Solicitud){
    let headers = new HttpHeaders().set('Content-type','application/json');
    return this._http.post(this.url+'/solicitudes',solicitud,{headers:headers});

  }

  revokeSolicitud(){

  }
}
