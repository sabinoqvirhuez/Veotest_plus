import { Component, OnInit } from '@angular/core';
import {Robot} from "../../../models/robot";
import {RobotService} from "../../../services/robot.service";

@Component({
  selector: 'app-crear-robot',
  templateUrl: './crear-robot.component.html',
  styleUrls: ['./crear-robot.component.css']
})
export class CrearRobotComponent implements OnInit{

  public title: string;
  public robot: Robot;
  public status: string;

  constructor(
    private service: RobotService
  ) {
    this.title = 'Registrar Robot';
    this.robot = new Robot('','','','',1);
    this.status ='';

  }
  ngOnInit(){

  }

  addRobot(form:any){
    console.log(this.robot);
    this.service.saveRobot(this.robot).subscribe(
      response  =>{
        console.log(response);
        form.reset();
        this.status='success';

      },error => {
        console.log(<any>error);
        this.status='failed';

      }
    );
  }

}
