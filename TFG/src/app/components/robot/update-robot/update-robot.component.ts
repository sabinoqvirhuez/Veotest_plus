import { Component, OnInit } from '@angular/core';
import {Robot} from "../../../models/robot";
import {RobotService} from "../../../services/robot.service";
import {HttpResponse} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
@Component({
  selector: 'app-update-robot',
  templateUrl: './update-robot.component.html',
  styleUrls: ['./update-robot.component.css']
})
export class UpdateRobotComponent implements OnInit{

  public title: string;
  public robot: Robot;
  public statusDireccion: string;
  public statusDescription: string;
  public statusDispositivo:string;


  constructor(
    private service: RobotService, private route: ActivatedRoute
  ) {
    this.title = 'Actualizar datos del Robot';
    this.robot = new Robot('','','','',1);
    this.statusDireccion ='';
    this.statusDescription='';
    this.statusDispositivo='';


  }

  ngOnInit(){

    this.route.params.subscribe(params => {
      const aux = params['name']; // Obtén el valor del parámetro de ruta llamado 'name'
      this.robot.name= aux; // Utiliza el valor del parámetro en tu lógica de componente
      console.log(aux);
    });

  }

  updateRobotM(form: any) {
    this.service.newDireccion(this.robot).subscribe(
      (response: HttpResponse<any>) => {
        this.statusDireccion = "success";
      },
      (error: any) => {
        console.log(error);
        this.statusDireccion = "failed";
      }
    );
    this.service.newDescription(this.robot).subscribe(
      (response: HttpResponse<any>)=>{
      this.statusDescription="success";
    },
      (error:any)=>{
        this.statusDescription="failed";

      });

    this.service.newDispositivo(this.robot).subscribe(
      (response: HttpResponse<any>)=>{
        this.statusDispositivo="success";
      },
      (error:any)=>{
        this.statusDispositivo="failed";

      });

    form.reset();
  }




}
