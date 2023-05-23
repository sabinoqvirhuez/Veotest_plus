import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders,HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Global} from "./global";
import {Robot} from "../models/robot";
import {User} from "../models/user";


@Injectable({
  providedIn: 'root'
})
export class RobotService {
  private url:string;
  constructor(
    private _http:HttpClient
  ) {
    this.url=Global.url;
  }
//Metodo que mediante una petición get obtiene un array de robots del backend
  listRobots() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get<Robot[]>(this.url + '/robots', { headers });
  }

  saveRobot(robot:Robot){
    let headers = new HttpHeaders().set('Content-type','application/json');
    return this._http.post(this.url+'/robots',robot,{headers:headers});
  }

  newDispositivo(robot: Robot): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify(robot);

    return this._http.put(this.url + '/robotsDispositivo', body, {
      headers,
      observe: 'response' // Aquí se especifica que se desea observar la respuesta completa
    });
  }
  newDescription(robot: Robot): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify(robot);

    return this._http.put(this.url + '/robots', body, {
      headers,
      observe: 'response' // Aquí se especifica que se desea observar la respuesta completa
    });
  }

  newDireccion(robot: Robot): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify(robot);

    return this._http.put(this.url + '/robotsDireccion', body, {
      headers,
      observe: 'response' // Aquí se especifica que se desea observar la respuesta completa
    });
  }

  newDisponibilidad(robot: Robot): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify(robot);

    return this._http.put(this.url + '/robotsDispo', body, {
      headers,
      observe: 'response' // Aquí se especifica que se desea observar la respuesta completa
    });
  }
  //Devuelve el robot con el nombre solicitado
  showRobot(name: string): Observable<HttpResponse<Robot[]>> {
    const url = `${this.url+'/profileRobot'}/${name}`;
    return this._http.get<Robot[]>(url, { observe: 'response' });
  }

  removeRobot(name: string): Observable<HttpResponse<any>> {
    const url= `${this.url+'/eliminarRobot'}/${name}`;
    return this._http.delete(url, {
      observe: 'response' // Aquí se especifica que se desea observar la respuesta completa
    });
  }

}
