import { Component,OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../models/user";
import {Router} from "@angular/router";
import {hideHTML} from "../../services/hidehtml";

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit{
  users: User[]=[];

  constructor(private servicio:UserService,private router: Router

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
  logout(){
    this.servicio.deleteToken();
    this.router.navigate(['/app'])
  }
  //Comprueba si el usuario está logeado
  loggedInaux(){
    return this.servicio.loggedIn();
  }
}
