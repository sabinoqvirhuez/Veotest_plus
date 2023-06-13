import { Component, OnInit } from '@angular/core';
import {RobotService} from "../../../services/robot.service";
import {Robot} from "../../../models/robot";
import {ActivatedRoute, Router} from "@angular/router";
import{HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-robot-profile',
  templateUrl: './robot-profile.component.html',
  styleUrls: ['./robot-profile.component.css']
})
export class RobotProfileComponent implements OnInit{

  robots: Robot[]=[];
  public statusDisponibilidad: string;

  constructor(private robotService:RobotService, private router : Router,private route: ActivatedRoute) {
    this.statusDisponibilidad='';
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const name = params['name']; // Obtén el valor del parámetro de ruta llamado 'name'
      this.listRobot(name); // Utiliza el valor del parámetro en tu lógica de componente

    });
  }

  listRobot(name: string) {
    this.robotService.showRobot(name).subscribe(
      response => {
        if (response && response.body) {
          this.robots = response.body;
          console.log(this.robots);
        } else {
          console.log('No se encontraron robots');
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  changeDetails(name:string){

    this.router.navigate(['updateRobot', name]).then(() => {
      console.log("Navegación exitosa")
    }).catch(error => {
      console.log("Error al navegar a updateRobot")
    });

  }

  changeAvailability(robotaux: Robot){

    if (robotaux.disponible === 'Disponible') {
      robotaux.disponible = 'No Disponible';
    } else {
      robotaux.disponible = 'Disponible';
    }


    this.robotService.newDisponibilidad(robotaux).subscribe(
      (response: HttpResponse<any>)=>{
        this.statusDisponibilidad="success";
      },
      (error:any)=>{
        this.statusDisponibilidad="failed";

      });
    console.log(this.statusDisponibilidad);
  }

}
