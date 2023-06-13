import { Component,OnInit } from '@angular/core';
import {SolicitudService} from "../../../services/solicitud.service";
import {SolicitudAux} from "../../../models/solicitudAux";

@Component({
  selector: 'app-create-solicitud',
  templateUrl: './create-solicitud.component.html',
  styleUrls: ['./create-solicitud.component.css']
})
export class CreateSolicitudComponent implements OnInit{
  solicitud: SolicitudAux;
  status:string;


  constructor(private service: SolicitudService) {
    this.solicitud = new SolicitudAux(0,'');
    this.status='';
  }

  ngOnInit() {
  }

  saveSolicitud(form:any){
    const flag = sessionStorage.getItem('Userid');
    let aux2: number;
    if (flag !== null) {
      aux2 = parseInt(flag);
      this.solicitud.Userid= aux2;
      this.service.saveSolicitud(this.solicitud).subscribe(
        response  =>{
          console.log(response);
          form.reset();
          this.status='success';

        },error => {
          console.log(<any>error);
          this.status='failed';

        }
      );
    } else {
      this.status='failed';
    }
  }
}
