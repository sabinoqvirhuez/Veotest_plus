import { Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class PeticionesService{
    public url: string;
    constructor(
        private _http: HttpClient
    ){
      this.url= "https://reqres.in";

    }
    //peticion AJAX HTTP y dice que el método getUser devuelve datos de tipo any
    getUser(): Observable<any>{
      return this._http.get(this.url+'/api/users/2');
    }
}
