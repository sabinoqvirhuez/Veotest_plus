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
}
