import { Component,OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Robot} from "../../models/robot";
import {RobotService} from "../../services/robot.service";

@Component({
  selector: 'app-robot',
  templateUrl: './robot.component.html',
  styleUrls: ['./robot.component.css']
})
export class RobotComponent implements OnInit{
  robots: Robot[]=[];

  constructor(private robotService:RobotService, private router:Router) {
  }
  ngOnInit() {

    this.robotService.listRobots().subscribe((robots) => {

      this.robots = robots;
    });


  }
}
