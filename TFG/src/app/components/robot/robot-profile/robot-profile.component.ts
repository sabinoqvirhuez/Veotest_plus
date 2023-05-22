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

  constructor(private robotService:RobotService, private router : Router,private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const name = params['name']; // Obtén el valor del parámetro de ruta llamado 'name'
      console.log("Llego hasta aqui");
      this.listRobot(name); // Utiliza el valor del parámetro en tu lógica de componente
      console.log("Llego hasta aqui 2");
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

}
