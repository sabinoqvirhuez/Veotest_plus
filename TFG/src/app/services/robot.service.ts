import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders,HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Global} from "./global";
import {Robot} from "../models/robot";

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
}
