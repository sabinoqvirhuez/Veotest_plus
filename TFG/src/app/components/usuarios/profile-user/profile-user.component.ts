import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/user.service";
import{User} from "../../../models/user";
import {Router} from "@angular/router";
import {HttpResponse} from "@angular/common/http";


@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.css']
})
export class ProfileUserComponent implements OnInit{

  users: User[]=[];

  constructor(private servicio: UserService,private router: Router) {


  }


  ngOnInit() {
    const aux = sessionStorage.getItem('Userid');
    let aux2: number;

    if (aux !== null) {
      aux2 = parseInt(aux);

      this.servicio.showUser(aux2).subscribe(user => {
        this.users = user;


      });


    } else {
      console.log('ESTA OCURRIENDO UN FALLO');
    }
  }
  borrarUsuario(){
    if(this.users.length>0){
      this.servicio.deleteUser(this.users[0].email).subscribe((res:HttpResponse<any>)=>{
        if(res.status==204){
          console.log("Usuario eliminado correctamente");
          this.servicio.deleteToken();
          this.router.navigate(['/app']);
        }
      },error => {
        console.error(error);
      });



    }else{
      console.log("Ha habido un problema borrando el usuario");
    }
  }

}






