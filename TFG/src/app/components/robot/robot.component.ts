import { Component,OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Robot} from "../../models/robot";
import {RobotService} from "../../services/robot.service";
import {UserService} from "../../services/user.service";
import{User} from "../../models/user";
import {HttpResponse} from "@angular/common/http";
import {SolicitudService} from "../../services/solicitud.service";
import {SolicitudAux} from "../../models/solicitudAux";
import {Solicitud} from "../../models/solicitud";

@Component({
  selector: 'app-robot',
  templateUrl: './robot.component.html',
  styleUrls: ['./robot.component.css']
})
export class RobotComponent implements OnInit{
  robots: Robot[]=[];
  usersB: User[]=[];
  aux:SolicitudAux;
  mysolicitudes : Solicitud[]=[];
  auxRobot: Robot;

  constructor(private robotService:RobotService, private router:Router,private servicio:UserService, private solicitudService: SolicitudService) {
    this.aux= new SolicitudAux(0,'');
    this.auxRobot= new Robot("","","","","");
  }
  ngOnInit() {
    this.initVariables();

  }

  initVariables(){
    this.robotService.listRobots().subscribe((robots) => {
      this.robots = robots;
    });

    let aux=this.getUserid();
    this.servicio.showUser(aux).subscribe(user => {
      this.usersB = user;

    });
    this.initMySolicitudes();

  }

  updateRobotInfo(name: string) {
    this.router.navigate(['profileRobot', name]).then(() => {
      console.log("Navegación exitosa")
    }).catch(error => {
      console.log("Error al navegar")
    });
  }

  deleteRobot(name: string){

    this.robotService.removeRobot(name).subscribe(
      (response: HttpResponse<any>)=>{
        console.log("El robot "+name+" ha sido borrado");
        this.robotService.listRobots().subscribe((robots) => {
          this.robots = robots;
        });
      },
      (error:any)=>{

        console.log("Ha habido un error borrando el robot: "+name);

      });




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
  getUserid():number{

    const aux = sessionStorage.getItem('Userid');
    let aux2: number;

    if (aux !== null) {
      aux2 = parseInt(aux);
      return aux2;
    } else {
      return 0;
    }

  }

  saveSolicitud(rname:string){

      this.aux.Userid= this.getUserid();
      this.aux.name=rname;
      this.solicitudService.saveSolicitud(this.aux).subscribe(
        response  =>{
          console.log("Solicitud creada");
          this.auxRobot.name=rname;
          this.auxRobot.disponible="No Disponible"
          this.robotService.newDisponibilidad(this.auxRobot).subscribe(
            (response: HttpResponse<any>) => {
              console.log("Disponibilidad del robot actualizada")
              this.initVariables();
            },
            (error: any) => {
              console.log(error);
              console.log("Error,Disponibilidad del robot no actualizada")
            }
          );
          this.initVariables();

        },error => {
          console.log(<any>error);
        }
      );
  }

  initMySolicitudes(){
    //Transforma el string que contiene el id del usuario logeado, en un dato de tipo number
    const aux = sessionStorage.getItem('Userid');
    let aux2: number;
    if (aux !== null) {
      aux2 = parseInt(aux);
      //Guarda en el Array mysolicitudes, todas las solicitudes del usuario logeado.
      this.solicitudService.listOneSolicitud(aux2).subscribe((aux)=>{
        this.mysolicitudes=aux;
      });
    } else {
      console.log('Fallo conviertiendo el dato de tipo string a number');
    }
  }

}
