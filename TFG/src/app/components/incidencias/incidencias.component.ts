import { Component, OnInit} from '@angular/core';
import {HttpResponse} from "@angular/common/http";
import {IncidenciaService} from "../../services/incidencia.service";
import {IncidenciaMy} from "../../models/incidenciaMy";
import { Router } from '@angular/router';
@Component({
  selector: 'app-incidencias',
  templateUrl: './incidencias.component.html',
  styleUrls: ['./incidencias.component.css']
})
export class IncidenciasComponent implements OnInit{

  myIncidencias : IncidenciaMy []=[];
  incidencias : IncidenciaMy[]=[];

  constructor(private service:IncidenciaService, private router: Router) {
  }

  ngOnInit() {
    this.initIncidencias();
    this.initMyIncidencias();
  }


  initMyIncidencias(){
    let aux = sessionStorage.getItem('Userid');
    let aux2: number;
    if (aux !== null) {
      aux2 = parseInt(aux);
      this.service.showMyIncidencias(aux2).subscribe(
        key => {
          this.myIncidencias = key;
        },
        error => {
          console.log("Error al obtener mis incidencias");
        }
      );

    } else {
      console.log('Fallo al obtener el id del usuario');
    }
  }

  initIncidencias(){
    this.service.showIncidencias().subscribe(
      key => {
        this.incidencias = key;
      },
      error => {
        console.log("Error al obtener todas las incidencias");
      }
    );

  }

  admin(): boolean {
    let aux: string | null = sessionStorage.getItem('Userid');

    if (aux !== null) {
      var userId: number = parseInt(aux, 10);

      if (!isNaN(userId) && userId === 11) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  borrarIncidencia(id:number,Userid:number){
    this.service.deleteIncidencia(id,Userid).subscribe((response: HttpResponse<any>)=>{
        console.log("La solicitud con Idincidencia: "+id+" y Userid: "+Userid + "ha sido borrada");
        this.initMyIncidencias();
        this.initIncidencias();
      },
      (error:any)=>{
        console.log("Error borrando a solicitud con Idincidencia: "+id+" y Userid: "+Userid);
      });

  }

  enviarDatos(aux:number,IdUser:number){
    this.router.navigate(['/profile-incidencia',aux,IdUser]).then(() => {
      console.log("Navegación exitosa")
    }).catch(error => {
      console.log("Error al navegar")
    });
  }
}
