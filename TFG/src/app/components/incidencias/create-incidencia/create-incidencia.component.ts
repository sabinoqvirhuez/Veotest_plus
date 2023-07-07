import { Component } from '@angular/core';
import {IncidenciaService} from "../../../services/incidencia.service";
import {IncidenciaAux} from "../../../models/incidenciaAux";

@Component({
  selector: 'app-create-incidencia',
  templateUrl: './create-incidencia.component.html',
  styleUrls: ['./create-incidencia.component.css']
})
export class CreateIncidenciaComponent {

  aux:IncidenciaAux;
  status:string;
  constructor(private service:IncidenciaService) {
    this.aux= new IncidenciaAux(0,"","");
    this.status="";
  }

  saveIncidencia(form:any){
    const flag = sessionStorage.getItem('Userid');
    let aux2: number;
    if (flag !== null) {
      aux2 = parseInt(flag);
      this.aux.Userid= aux2;
      this.service.saveKey(this.aux).subscribe(
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

  protected readonly IncidenciaAux = IncidenciaAux;
}
