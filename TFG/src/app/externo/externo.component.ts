import { Component, OnInit } from '@angular/core';
import {PeticionesService} from "../services/peticiones.service";

@Component({
  selector: 'app-externo',
  templateUrl: './externo.component.html',
  styleUrls: ['./externo.component.css'],
  providers:[PeticionesService]
})
export class ExternoComponent implements OnInit{

  public user: any;

  constructor(
    private _peticionesService: PeticionesService
  ){
  }
  ngOnInit(){
    this._peticionesService.getUser().subscribe(
      (response: any) => {
        // Manejar la respuesta exitosa aquí
        this.user = response.data;
      },
      (error: any) => {
        // Manejar el error aquí
        console.error(error);
      }
    );

  }
}

