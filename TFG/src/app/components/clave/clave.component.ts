import { Component, OnInit} from '@angular/core';
import {KeyService} from "../../services/key.service";
import {Router} from "@angular/router";
import{Key} from "../../models/key"
import {HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-clave',
  templateUrl: './clave.component.html',
  styleUrls: ['./clave.component.css']
})
export class ClaveComponent implements OnInit{

  keys: Key[]=[];


  constructor(private service:KeyService,private route: Router) {
  }


  ngOnInit() {
    const aux = sessionStorage.getItem('Userid');
    let aux2: number;
    if (aux !== null) {
      aux2 = parseInt(aux);
      this.service.showKey(aux2).subscribe(key => {
        this.keys = key;
      });
    } else {
      console.log('Fallo');
    }
  }

  deleteKey(id:number){
    this.service.removeKey(id).subscribe(
      (response: HttpResponse<any>)=>{
        console.log("La clave ha sido borrado");
      },
      (error:any)=>{
        console.log("Ha habido un error borrando la clave");
      });
  }

}
