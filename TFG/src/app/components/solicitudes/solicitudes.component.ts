import { Component, OnInit } from '@angular/core';
import {SolicitudService} from "../../services/solicitud.service";
import {Solicitud} from "../../models/solicitud";
import {SolicitudAux} from "../../models/solicitudAux";
import {HttpResponse} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.css']
})
export class SolicitudesComponent implements OnInit{

  solicitudes: Solicitud[]=[];
  mysolicitudes: Solicitud[]=[];
  aux:Solicitud;

  constructor(private service: SolicitudService, private router: Router) {
    this.aux= new Solicitud(0,0,'',new Date(),0);
  }
  ngOnInit() {
    this.initVariables();
  }
  borrarSolicitud(Userid:number,Robotid:number){
    this.service.removeSolicitud(Robotid,Userid).subscribe((response: HttpResponse<any>)=>{
        console.log("La solicitud con Robotid: "+Robotid+" y Userid: "+Userid + "ha sido borrada");
      },
      (error:any)=>{
        console.log("Error borrando a solicitud con Robotid: "+Robotid+" y Userid: "+Userid);
      });
  }

  actualizarEstadoDeSolicitud(Userid:number,Robotid:number,Estado:number){
    this.aux.Userid=Userid;
    this.aux.Robotid=Robotid;
    this.aux.Estado=Estado;
    this.service.newEstado(this.aux).subscribe((response: HttpResponse<any>)=>
    {
      console.log("Se cambió el estado de la solicitud correctamente");
      this.initVariables();

    },error => {
      console.log("Error cambiando el estado de la solicitud");
    })
  }

  initVariables() {
    this.initSolicitudes();
    this.initMySolicitudes();
  }

  initSolicitudes(){
    // Guarda en el Array solicitudes, todas las solicitudes existentes en la base de datos
    this.service.listSolicitudes().subscribe((aux)=>{
      this.solicitudes=aux;
    });
  }

  initMySolicitudes(){
    //Transforma el string que contiene el id del usuario logeado, en un dato de tipo number
    const aux = sessionStorage.getItem('Userid');
    let aux2: number;
    if (aux !== null) {
      aux2 = parseInt(aux);
      //Guarda en el Array mysolicitudes, todas las solicitudes del usuario logeado.
      this.service.listOneSolicitud(aux2).subscribe((aux)=>{
        this.mysolicitudes=aux;
      });
    } else {
      console.log('Fallo conviertiendo el dato de tipo string a number');
    }
  }

  admin(): boolean {
    var aux: string | null = sessionStorage.getItem('Userid');

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

  concederAcceso(aux:Solicitud){

    this.service.provideSolicitud(aux).subscribe(
      response  =>{
        console.log(response);
        console.log("Se hizo correctamente");

      },error => {
        console.log(<any>error);
        console.log("Ocurrio un error");

      }
    );

  }


}
