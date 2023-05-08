import { Component,OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../models/user";

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit{
  users: User[]=[];

  constructor(private servicio:UserService,

  ) {
  }

  ngOnInit() {
    this.servicio.listUsers().subscribe((users) => {
      console.log(users);
      this.users = users;
    });
  }
  listarUsuarios(){
    this.servicio.listUsers().subscribe((users) => {

      this.users = users;
    });
  }
}
