import { Component,OnInit } from '@angular/core';
import {IncidenciaService} from "../../../services/incidencia.service";
import {IncidenciaMy} from "../../../models/incidenciaMy";
import {ActivatedRoute} from "@angular/router";
@Component({
  selector: 'app-profile-incidencia',
  templateUrl: './profile-incidencia.component.html',
  styleUrls: ['./profile-incidencia.component.css']
})
export class ProfileIncidenciaComponent implements OnInit{


  IdUser: number;
  IdIncidencia:number;
  myIncidencias : IncidenciaMy []=[];
  constructor(private service:IncidenciaService, private route: ActivatedRoute  ) {
    this.IdUser=0;
    this.IdIncidencia=0;
  }
  ngOnInit() {
    //this.initArray();

    this.route.params.subscribe(params => {
      const aux = params['aux']; // Obtén el valor del parámetro de ruta llamado 'name'
      this.IdUser = params['IdUser'];
      console.log(aux,this.IdUser);
      this.listIncidencia(aux,this.IdUser); // Utiliza el valor del parámetro en tu lógica de componente

    });
    console.log("Se entro a la componente");


  }

  listIncidencia(aux:number,user:number){

    this.service.showOnencidencia(user,aux).subscribe(

      response => {
        if (response && response.body) {
          this.myIncidencias = response.body;
          console.log(this.myIncidencias);
        } else {
          console.log('No se encontraron robots');
        }
      },
      error => {
        console.log(error);
      }
    );

  }

  protected readonly IncidenciaMy = IncidenciaMy;
}
