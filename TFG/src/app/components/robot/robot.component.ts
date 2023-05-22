import { Component,OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Robot} from "../../models/robot";
import {RobotService} from "../../services/robot.service";
import {UserService} from "../../services/user.service";
import{User} from "../../models/user";

@Component({
  selector: 'app-robot',
  templateUrl: './robot.component.html',
  styleUrls: ['./robot.component.css']
})
export class RobotComponent implements OnInit{
  robots: Robot[]=[];
  usersB: User[]=[];

  constructor(private robotService:RobotService, private router:Router,private servicio:UserService) {
  }
  ngOnInit() {
    this.robotService.listRobots().subscribe((robots) => {
      this.robots = robots;
    });
    const aux = sessionStorage.getItem('Userid');
    let aux2: number;

    if (aux !== null) {
      aux2 = parseInt(aux);

      this.servicio.showUser(aux2).subscribe(user => {
        this.usersB = user;

      });
    } else {
      console.log('Fallo');
    }

  }

  updateRobotInfo(name: string) {
    this.router.navigate(['profileRobot', name]).then(() => {
      console.log("Navegación exitosa")
    }).catch(error => {
      console.log("Error al navegar")
    });
  }

  deleteRobot(robot:Robot){
    console.log("El robot "+robot.name+" ha sido borrado");
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

}
